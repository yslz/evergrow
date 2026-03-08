import { Node } from "../core/node.js";
import { computeConnections } from "../core/network.js";
import { onTick, startClock, getTick } from "../core/clock.js";
import { drawNodes, drawEdges, drawTick } from "./renderer.js";
import { computeConnectionsGrid } from "../core/grid.js";

const NODE_COUNT = 1000;
const MAX_DIST = 80;      // 邻居感知范围
const CELL_SIZE = 80;     // Grid 分区大小（>= MAX_DIST）

const canvas = document.getElementById("evergrow");
const ctx = canvas.getContext("2d");



let nodes = [];
let edges = [];
let lastWidth = window.innerWidth;
let lastHeight = window.innerHeight;

// --- resize ---
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

const zones = [
  { x: 0, y: 0, w: canvas.width/2, h: canvas.height/2, energyBias: 0.2, birthRate: 0.01 },
  { x: canvas.width/2, y: 0, w: canvas.width/2, h: canvas.height/2, energyBias: -0.1, birthRate: 0.02 },
  { x: 0, y: canvas.height/2, w: canvas.width/2, h: canvas.height/2, energyBias: 0.0, birthRate: 0.005 },
  { x: canvas.width/2, y: canvas.height/2, w: canvas.width/2, h: canvas.height/2, energyBias: 0.15, birthRate: 0.015 }
];

// --- init nodes ---
for (let i = 0; i < NODE_COUNT; i++) {
  nodes.push(
    new Node(
      i,
      Math.random() * canvas.width,
      Math.random() * canvas.height
    )
  );
}

// --- heartbeat reaction ---
onTick((t) => {
  nodes.forEach(n => {
    const zone = zones.find(z => 
      n.x >= z.x && n.x < z.x + z.w &&
      n.y >= z.y && n.y < z.y + z.h
    );

    if (zone) {
      n.zoneBias = zone.energyBias * 1;
    } else {
      n.zoneBias = 0;   // 不在任何分区时清零
    }

    n.update(t)
  });

  nodes.forEach(n => n.neighbours = []);
  
  if (t % 10 === 0) {
    edges = computeConnectionsGrid(nodes, CELL_SIZE, MAX_DIST);
  }
});

// --- draw loop ---
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawEdges(ctx, edges, 80);
  drawNodes(ctx, nodes);
  drawTick(ctx, getTick());
  
  requestAnimationFrame(draw);
}

draw();
startClock(1000);
