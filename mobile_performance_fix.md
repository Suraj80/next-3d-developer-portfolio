# 📱 Mobile Performance Fixes — Post-Projects Section

> **Issue:** Performance dropped significantly on mobile after the **Projects** section.
> The site became slow, laggy, and sometimes unresponsive when scrolling past it.
>
> **Root Cause:** A cumulative compounding problem — multiple components past that
> point each had their own expensive operations that piled up simultaneously on
> mobile GPUs and JS threads. No single component was the sole culprit; they
> collectively overwhelmed low-to-mid range mobile hardware.

---

## Root Cause #1 — Infinite Framer Motion Animations Accumulating Off-Screen

**Files:** `About.tsx`, `Contact.tsx`, `Experience.tsx`

### The Problem

Framer Motion's `repeat: Infinity` animations do **not** pause when the element
scrolls off-screen. They keep running on the JS animation thread indefinitely.
By the time the user scrolled past the Projects section, the following infinite
loops were all running simultaneously:

| Component | Animation | Cost |
|---|---|---|
| `About.tsx` | 6 floating icons — `y: [0,-15,0]` and `rotate: [0,5,-5,0]` each | 12 simultaneous JS-driven values |
| `About.tsx` | Gradient border `rotate: 360` (8s cycle) | 1 JS-driven rotation |
| `About.tsx` | Profile glow `scale: [1, 1.1, 1]` (6s cycle) | 1 JS-driven scale |
| `Experience.tsx` | Current-role pulse dot `scale: [1,1.8,1]`, `opacity: [0.5,0,0.5]` | 2 JS-driven values |
| `Contact.tsx` | Submit button shimmer `x: ["-100%", "100%"]` (2s, always on) | 1 JS-driven transform |
| `Contact.tsx` | Green dot `scale: [1,1.2,1]`, `opacity: [0.5,1,0.5]` | 2 JS-driven values |

**Total: 19 simultaneous `repeat: Infinity` Framer Motion animations** running
continuously at scroll time — before a single user interaction.

### The Fix

Replaced all of these with **native CSS animations** (`@keyframes`) or Tailwind's
`animate-ping` / `animate-spin` utilities. CSS animations are handled entirely by
the browser's **compositor thread** — they don't touch JavaScript at all.

| Component | Before | After |
|---|---|---|
| `About.tsx` — 6 floating icons | `motion.div` with `animate={{ y, rotate }}` `repeat: Infinity` | Plain `<div>` with `animation: floatIcon 3s ease-in-out Xs infinite` CSS |
| `About.tsx` — rotating border | `motion.div` with `animate={{ rotate: 360 }}` | Plain `<div>` with `.about-border-spin` CSS class |
| `About.tsx` — pulsing glow | `motion.div` with `animate={{ scale: [1,1.1,1] }}` | Removed animation entirely; static `opacity-20` div |
| `Contact.tsx` — shimmer button | `motion.div` with `animate={{ x: ["-100%","100%"] }}` | Removed entirely |
| `Contact.tsx` — green dot | `motion.div` with `animate={{ scale, opacity }}` | `<span className="animate-ping">` |
| `Experience.tsx` — pulse dot | `motion.div` with `animate={{ scale, opacity }}` | `<span className="animate-ping">` |

**Added to `globals.css`:**

```css
@keyframes floatIcon {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}

@keyframes borderSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.about-border-spin {
  animation: borderSpin 8s linear infinite;
}
```

---

## Root Cause #2 — `backdrop-blur-xl` on Every Card on Mobile

**Files:** `Experience.tsx`, `Contributions.tsx`, `Contact.tsx`

### The Problem

`backdrop-blur-xl` triggers GPU compositing for **each element** it's applied to.
Every card forced the browser to:
1. Create a new compositor layer
2. Sample all surrounding pixels
3. Apply a Gaussian blur kernel
4. Composite it back

On mobile GPUs with limited VRAM/bandwidth, stacking 10+ blurred layers causes
severe frame drops. The pattern in use was:

```css
/* Applied to all cards */
backdrop-blur-sm md:backdrop-blur-xl
```

Even `backdrop-blur-sm` on mobile is expensive when applied to many elements.

### The Fix

Replaced glassmorphism blur with opaque solid backgrounds. On a pure black
background the visual difference is negligible, but the GPU cost drops to zero.

| File | Before | After |
|---|---|---|
| `Experience.tsx` | `bg-black/60 backdrop-blur-sm md:backdrop-blur-xl` | `bg-black/80` |
| `Contributions.tsx` | `bg-black/40 backdrop-blur-sm md:backdrop-blur-xl` | `bg-black/80` |
| `Contact.tsx` | `bg-black/60 backdrop-blur-sm md:backdrop-blur-xl` | `bg-black/80` |

---

## Root Cause #3 — Massive Framer Motion Node Count in `Contributions.tsx`

**File:** `Contributions.tsx`

### The Problem

Every contribution card created a deeply nested tree of Framer Motion nodes:

1. Outer `motion.div` — card entrance animation
2. `motion.div` — hover glow (`whileHover={{ opacity: 1 }}`)
3. `motion.div` — hover lift (`whileHover={{ y: -8, scale: 1.02 }}`)
4. **Per-tech-tag** `motion.span` — each with `whileInView`, `initial`, `whileHover`
5. `motion.span` — type badge (`whileHover`)
6. `motion.a` — GitHub button (`whileHover` + `whileTap`)

For 6 contribution cards with ~3–5 tech tags each → roughly **50–70 active Framer
Motion nodes**, all with event listeners, gesture tracking, and transform monitors.

### The Fix

| Before | After |
|---|---|
| Nested `motion.div` glow | Plain `<div>` with CSS `transition-opacity` |
| `motion.div` hover-lift wrapper | Plain `<div>` with CSS `transition` |
| Per-tag `motion.span` | Plain `<span>` |
| `motion.span` badge | Plain `<span>` |
| `motion.a` GitHub button | Plain `<a>` with CSS hover transitions |

---

## Root Cause #4 — Multiple `useScroll` Hooks Creating Redundant Scroll Listeners

**Files:** `Experience.tsx`, `Contributions.tsx`, `Contact.tsx`, `Footer.tsx`

### The Problem

Each `useScroll()` call attaches a passive scroll event listener and maintains
internal scroll position state. By the time the user reached the bottom sections,
there were **5 active scroll listeners** — three of which were completely unused:

| Component | `useScroll` calls | Actually used in JSX? |
|---|---|---|
| `Experience.tsx` | 2 (section + timeline) | Only timeline was used |
| `Contributions.tsx` | 1 | ❌ Never — `scrollYProgress` not referenced |
| `Contact.tsx` | 1 (via `useParallax`) | ❌ Never — sectionRef removed earlier |
| `Footer.tsx` | 1 | ❌ Never — `scrollYProgress` not referenced |

### The Fix

Removed all unused `useScroll` / `useTransform` / `useRef` / `useParallax` hooks
and their associated imports:

| File | Removed |
|---|---|
| `Experience.tsx` | Section-level `useScroll` (kept timeline `useScroll`) |
| `Contributions.tsx` | `useScroll`, `useTransform`, `useRef` imports |
| `Contact.tsx` | `useScroll`, `useTransform`, `useParallax`, `useRef` imports |
| `Footer.tsx` | `useScroll`, `useTransform`, `useRef` imports |

---

## Root Cause #5 — One `IntersectionObserver` Per Card in `Experience.tsx`

**File:** `Experience.tsx`

### The Problem

The active card detection logic created a **separate `IntersectionObserver`
instance for every experience card**:

```ts
// Before — N observers for N cards
cardRefs.current.forEach((cardRef) => {
    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(cardRef);
    observers.push(observer);
});
```

Each instance has its own internal state, event registration, and GC pressure.

### The Fix

Converted to a **single shared `IntersectionObserver`** that observes all cards:

```ts
// After — 1 observer for all cards
const observer = new IntersectionObserver(handleIntersection, options);
cardRefs.current.forEach((cardRef) => {
    if (cardRef) observer.observe(cardRef);
});
return () => observer.disconnect();
```

---

## Root Cause #6 — `motion.li` Nodes Inside Every Experience Card

**File:** `Experience.tsx`

### The Problem

Each experience card's bullet points were rendered as `motion.li` elements with
`whileInView`, `initial`, and staggered `transition` (`delay: i * 0.08`):

```tsx
<motion.li
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.08, duration: 0.3 }}
    viewport={{ once: true }}
>
```

For 3–5 experience cards × 3–5 bullets → **15–25 additional Framer Motion nodes**,
each registering their own internal `IntersectionObserver`.

### The Fix

Converted all `motion.li` to plain `<li>`. The card-level `motion.div` entrance
animation was retained for the reveal effect. The per-bullet stagger was not
a perceptible design element.

---

## Root Cause #7 — Missing `sizes` and `loading` on Project Images

**File:** `Projects.tsx`

### The Problem

Next.js `<Image fill>` without a `sizes` prop defaults to fetching the **largest
available image** regardless of the actual rendered size. On mobile, a featured
project card at ~375px wide was downloading a full desktop-resolution image.

### The Fix

```tsx
// Featured project images (half viewwidth on desktop, full on mobile)
<Image
    src={featured.image}
    alt={featured.title}
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
/>

// Other project card images (always below the fold)
<Image
    src={project.image}
    alt={project.title}
    fill
    className="object-cover"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    loading="lazy"
/>
```

---

## 📁 File-by-File Change Summary

| File | Changes Made |
|---|---|
| `src/app/globals.css` | Added `@keyframes floatIcon`, `@keyframes borderSpin`, and `.about-border-spin` class |
| `src/components/About.tsx` | Replaced 6 floating icon Framer Motion animations with CSS; removed infinite glow scale; replaced rotating border `motion.div` with CSS class |
| `src/components/Experience.tsx` | Removed unused section `useScroll`; consolidated N IntersectionObservers → 1; replaced `motion.li` bullets with `<li>`; replaced `motion.div` card glow with CSS transition; replaced pulse dot `motion.div` with `animate-ping`; removed `backdrop-blur` from mobile cards |
| `src/components/Contributions.tsx` | Removed unused `useScroll`/`useTransform`/`useRef`; replaced nested motion glow + hover wrapper with plain divs; replaced `motion.span` tech tags and badge with plain `<span>`; replaced `motion.a` button with plain `<a>`; removed `backdrop-blur` |
| `src/components/Contact.tsx` | Removed infinite shimmer animation from submit button (replaced with CSS gradient `<button>`); replaced pulsing dot `motion.div` with `animate-ping`; removed `backdrop-blur-xl`; cleaned up all unused imports |
| `src/components/Footer.tsx` | Removed unused `useScroll`/`useTransform`/`useRef` imports and the unused `sectionRef` |
| `src/components/Projects.tsx` | Added `sizes` attributes to all project images; added `loading="lazy"` to below-fold project card images |

---

## 🧠 Key Takeaways for Future Development

1. **Framer Motion `repeat: Infinity` is dangerous on scroll pages.** Use CSS `@keyframes` for looping animations — they live on the compositor thread and cost zero JS.
2. **`backdrop-blur` is the most expensive CSS property on mobile.** Only use it where absolutely necessary. A high-opacity solid background (`bg-black/85`) is visually equivalent on dark themes with zero GPU cost.
3. **Every `useScroll` = a scroll event listener.** Audit and remove any that are unused. Framer Motion's scroll tracking is not free.
4. **One `IntersectionObserver` can observe many elements.** Never create one per element in a loop.
5. **`motion.*` components have overhead per node** (event tracking, transform monitoring). Convert non-critical elements to plain HTML with CSS transitions.
6. **Always add `sizes` to `<Image fill>`.** Without it, Next.js serves oversized images on mobile.
