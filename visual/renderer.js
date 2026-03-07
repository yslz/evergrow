// visual/renderer.js

export function drawEdges(ctx, edges, maxDistance) {
  edges.forEach(e => {
    const alpha = 1 - e.dist / maxDistance;
    ctx.strokeStyle = `rgba(0, 200, 255, ${alpha * 0.2})`;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(e.a.x, e.a.y);
    ctx.lineTo(e.b.x, e.b.y);
    ctx.stroke();
  });
}

export function drawNodes(ctx, nodes) {
  nodes.forEach(n => {
    ctx.beginPath();
    ctx.fillStyle = `rgba(0, 200, 255, ${n.glow})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "cyan";
    ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

export function drawTick(ctx, tick) {
  ctx.fillStyle = "white";
  ctx.font = "16px monospace";
  ctx.fillText(`tick: ${tick}`, 20, 30);
}
