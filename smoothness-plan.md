# Smoothness Plan

## What is likely making the site feel less smooth

- Continuous background animation loop plus multiple CSS keyframe animations and large blurred layers in the cyber grid runs all the time, even when the user is idle. This is constant GPU and compositor work. See [src/components/CyberpunkGrid.tsx](src/components/CyberpunkGrid.tsx#L8-L140).
- The 3D Spline scene is heavy and is mounted in the hero on both mobile and desktop layouts, with very large canvas heights. This can dominate main thread and GPU time. See [src/components/Hero.tsx](src/components/Hero.tsx#L67-L133) and [src/components/SplineRobot.tsx](src/components/SplineRobot.tsx#L20-L47).
- Many scroll-linked animations are running across multiple sections, each with its own `useScroll` and `useTransform`, causing frequent updates while scrolling. Examples: [src/components/Hero.tsx](src/components/Hero.tsx#L21-L28), [src/components/About.tsx](src/components/About.tsx#L73-L81), [src/components/TechStack.tsx](src/components/TechStack.tsx#L30-L38), [src/components/Contributions.tsx](src/components/Contributions.tsx#L148-L175), [src/components/Contact.tsx](src/components/Contact.tsx#L20-L39), [src/components/Experience.tsx](src/components/Experience.tsx#L136-L170), [src/components/Footer.tsx](src/components/Footer.tsx#L10-L20).
- The navbar updates React state on every scroll event without throttling. That causes extra re-renders during scroll. See [src/components/Navbar.tsx](src/components/Navbar.tsx#L13-L23).
- Several components have perpetual or frequent animations: floating tech icons, rotating borders, card bobbing, shimmer effects, and hover glows. These stack up across sections and can create a constant animation load. See [src/components/About.tsx](src/components/About.tsx#L42-L57), [src/components/TechStack.tsx](src/components/TechStack.tsx#L100-L131), [src/components/Contributions.tsx](src/components/Contributions.tsx#L54-L78), [src/components/Contact.tsx](src/components/Contact.tsx#L175-L196).
- Interval-driven animations can also add jank. The About counters use `setInterval` at 60 fps. See [src/components/About.tsx](src/components/About.tsx#L13-L29).
- The MatrixRain canvas uses `setInterval` and rescales the canvas on resize without resetting the transform, which can compound scaling. It is not used currently, but it will be expensive if enabled. See [src/components/MatrixRain.tsx](src/components/MatrixRain.tsx#L8-L63).

## Plan to make it feel smooth

### Phase 1: Measure and reduce baseline animation cost

1. Profile scroll and idle FPS in Chrome Performance and record the biggest long tasks (baseline before changes).
2. Add a global reduced-motion path and honor `prefers-reduced-motion` to disable or simplify:
   - Cyberpunk grid rAF loop and keyframe scans.
   - Floating icons, glow pulses, shimmer effects, and scroll indicators.
3. Reduce the number and size of blurred layers (large `blur-3xl` glows and heavy shadows) or replace with static background images.
4. In the navbar, throttle the scroll progress update with `requestAnimationFrame` or a small `throttle`, and mark the scroll listener as `{ passive: true }`.

### Phase 2: Defer and gate the heaviest assets

1. Gate the Spline scene with `IntersectionObserver` so it loads only when the hero is near view, and avoid rendering it twice at the same time on large screens.
2. Provide a lightweight fallback image for the 3D scene on mobile or when reduced motion is on.
3. Consider lowering the scene complexity in Spline (fewer meshes, lower texture sizes, reduced lighting complexity).

### Phase 3: Make animations lifecycle-aware

1. Pause or stop animation loops when sections are out of view (use `useInView` to toggle animations).
2. Replace per-mousemove style writes with rAF-coalesced updates in About and Tech cards, and disable these on touch devices.
3. Remove perpetual bobbing on grids of cards and only animate on hover or when in view.
4. If MatrixRain is used, switch to `requestAnimationFrame`, cap DPR (for example, `Math.min(devicePixelRatio, 1.5)`), and reset the canvas transform on resize before scaling.

### Phase 4: Verify

1. Re-profile to confirm reduced main thread time and smoother scroll.
2. Check mobile device performance and battery drain.
3. Test with reduced motion and confirm that the site still feels polished.
