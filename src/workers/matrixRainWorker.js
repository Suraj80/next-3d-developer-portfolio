// matrixRainWorker.js
// This worker generates matrix rain animation data and sends it to the main thread.

let columns = 0;
let drops = [];
let width = 0;
let height = 0;
let fontSize = 16;
let chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function init(w, h, fSize) {
  width = w;
  height = h;
  fontSize = fSize || 16;
  columns = Math.floor(width / fontSize);
  drops = Array(columns).fill(1);
}

function step() {
  const frame = [];
  for (let i = 0; i < columns; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    frame.push({
      x: i * fontSize,
      y: drops[i] * fontSize,
      text
    });
    if (Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
  postMessage({ type: 'frame', frame });
}

onmessage = function(e) {
  const { type, width, height, fontSize } = e.data;
  if (type === 'init') {
    init(width, height, fontSize);
  } else if (type === 'step') {
    step();
  }
};
