// 3dRobotWorker.js
// This worker is a placeholder for heavy 3D robot logic (e.g., physics, AI)
// Rendering must still be done on the main thread.

onmessage = function (e) {
  // Example: receive a command to compute something heavy
  const { type, payload } = e.data;
  if (type === 'compute') {
    // Simulate heavy computation
    let result = 0;
    for (let i = 0; i < 1e7; i++) {
      result += Math.sin(i);
    }
    postMessage({ type: 'result', result });
  }
};
