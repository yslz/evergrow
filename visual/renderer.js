// visual/renderer.js

export function drawEdges(ctx, edges, maxDistance) {
  edges.forEach(e => {
    const a = e.a;
    const b = e.b;

    // 距离衰减（旧逻辑）
    const distAlpha = 1 - e.dist / maxDistance;

    // 能量衰减（新逻辑）
    const energy = (a.energy + b.energy) * 0.5;

    // 最终透明度 = 距离 × 能量
    const alpha = distAlpha * (0.4 + energy * 1.0);

    // 颜色：随能量变化
    const r = Math.floor(100 + 155 * energy);
    const g = Math.floor(180 + 75 * energy);
    const bcol = Math.floor(255 * energy);

    ctx.strokeStyle = `rgba(${r}, ${g}, ${bcol}, ${alpha})`;

    // 线宽：随能量变化
    ctx.lineWidth = 0.5 + energy * 1.5;

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  });
}

export function drawNodes(ctx, nodes) {
  nodes.forEach(n => {
    const e = n.energy;          // 0~1
    const phase = n.colorPhase;  // 0~1

    // --- 色彩渐变：蓝 → 青 → 紫 → 白 ---
    const r = Math.floor(100 + 155 * e);
    const g = Math.floor(150 + 105 * Math.sin(phase * Math.PI * 2));
    const b = Math.floor(255 * e);

    // --- 光晕 ---
    ctx.shadowBlur = 20 * e;
    ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${e})`;

    // --- 节点本体 ---
    ctx.beginPath();
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.6 + e * 0.4})`;
    ctx.arc(n.x, n.y, 2 + e * 3, 0, Math.PI * 2);
    ctx.fill();
  });

    // 清除阴影设置，避免影响其他绘制
  ctx.shadowBlur = 0;
}

export function drawTick(ctx, tick) {
  ctx.fillStyle = "white";
  ctx.font = "16px monospace";
  ctx.fillText(`tick: ${tick}`, 20, 30);
}
