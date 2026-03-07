const canvas = document.getElementById("evergrow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = [];

for (let i = 0; i < 1000; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 2 + Math.random() * 1.5,
    glow: Math.random() * 0.5
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

  requestAnimationFrame(draw);
}

draw();
