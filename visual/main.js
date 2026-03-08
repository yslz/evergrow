import { Node } from "../core/node.js";
import { computeConnections } from "../core/network.js";
import { onTick, startClock, getTick } from "../core/clock.js";
import { drawNodes, drawEdges, drawTick } from "./renderer.js";
import { computeConnectionsGrid } from "../core/grid.js";

let NODE_COUNT = 1000;
let FPS = 33;

// 从 localStorage 读取上次设置的值（如果有）
const savedFps = localStorage.getItem('evergrow_fps');
if (savedFps) {
  const v = parseInt(savedFps);
  if (!isNaN(v) && v > 0) FPS = v;
}

const savedNodes = localStorage.getItem('evergrow_nodes');
if (savedNodes) {
  const v = parseInt(savedNodes);
  if (!isNaN(v) && v > 0) NODE_COUNT = v;
}


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
    if (n.baseX !== undefined) n.baseX *= scaleX;
    if (n.baseY !== undefined) n.baseY *= scaleY;
  });

  canvas.width = newWidth;
  canvas.height = newHeight;

  lastWidth = newWidth;
  lastHeight = newHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// 同步 UI 显示为当前值
const fpsInput = document.getElementById("fpsInput");
if (fpsInput) fpsInput.value = FPS;

const nodeInput = document.getElementById("nodeCountInput");
if (nodeInput) nodeInput.value = NODE_COUNT;


const zones = [
  { x: 0, y: 0, w: canvas.width/2, h: canvas.height/2, energyBias: 0.2, birthRate: 0.01 },
  { x: canvas.width/2, y: 0, w: canvas.width/2, h: canvas.height/2, energyBias: -0.01, birthRate: 0.02 },
  { x: 0, y: canvas.height/2, w: canvas.width/2, h: canvas.height/2, energyBias: 0.0, birthRate: 0.005 },
  { x: canvas.width/2, y: canvas.height/2, w: canvas.width/2, h: canvas.height/2, energyBias: 0.15, birthRate: 0.015 }
];

// ⭐ 保存分区初始位置
const baseZones = JSON.parse(JSON.stringify(zones));


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
  zones.forEach((z, i) => {
    const base = baseZones[i];
    z.x = base.x + Math.sin(t * 0.001 + i) * 50;   // 50px 左右摆动
    z.y = base.y + Math.cos(t * 0.001 + i) * 50;
  });

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

  // 死亡节点过滤
  nodes = nodes.filter(n => !n.dead);

  nodes.forEach(n => n.neighbours = []);
  
  if (t % 10 === 0) {
    edges = computeConnectionsGrid(nodes, CELL_SIZE, MAX_DIST);
  }

  // --- 出生机制 ---
  zones.forEach(zone => {
    if (Math.random() < zone.birthRate * 10) {
      const newborn = new Node(
        nodes.length,
        zone.x + Math.random() * zone.w,
        zone.y + Math.random() * zone.h
      );
      nodes.push(newborn);
    }
  });
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
startClock(FPS);
