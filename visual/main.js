const canvas = document.getElementById("evergrow");
const ctx = canvas.getContext("2d");

let nodes = [];
let lastWidth = window.innerWidth;
let lastHeight = window.innerHeight;

function resizeCanvas() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  const scaleX = newWidth / lastWidth;
  const scaleY = newHeight / lastHeight;

  nodes.forEach(n => {
    n.x *= scaleX;
    n.y *= scaleY;
  });

  canvas.width = newWidth;
  canvas.height = newHeight;

  lastWidth = newWidth;
  lastHeight = newHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let tick = 0;
const TICK_INTERVAL = 1000; // 毫秒，先假设 1 秒一个块

for (let i = 0; i < 1000; i++) {
  nodes.push({
    id: i,                  //for future real node id
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 2 + Math.random() * 1.5,
    glow: Math.random() * 0.5,
    alive: true             //for future real node status
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  nodes.forEach(n => {
    ctx.beginPath();
    ctx.fillStyle = `rgba(0, 200, 255, ${0.3 + n.glow})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "cyan";
    ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "white";
  ctx.font = "16px monospace";
  ctx.fillText(`tick: ${tick}`, 20, 30);

  requestAnimationFrame(draw);
}

function heartbeat() {
  tick += 1;
  console.log("tick:", tick);
  nodes.forEach(n => {
    n.glow = 0.3 + 0.2 * Math.sin(tick * 0.5);
  });
}

draw();
setInterval(heartbeat, TICK_INTERVAL);