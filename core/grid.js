// core/grid.js

export function buildGrid(nodes, cellSize) {
  const grid = new Map();

  nodes.forEach(n => {
    const gx = Math.floor(n.x / cellSize);
    const gy = Math.floor(n.y / cellSize);
    const key = `${gx},${gy}`;

    if (!grid.has(key)) grid.set(key, []);
    grid.get(key).push(n);
  });

  return grid;
}

export function computeConnectionsGrid(nodes, cellSize, maxDist) {
  const grid = buildGrid(nodes, cellSize);
  const edges = [];

  const neighborOffsets = [
    [-1,-1], [0,-1], [1,-1],
    [-1, 0], [0, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]
  ];

  nodes.forEach(n => {
    const gx = Math.floor(n.x / cellSize);
    const gy = Math.floor(n.y / cellSize);

    neighborOffsets.forEach(([ox, oy]) => {
      const key = `${gx + ox},${gy + oy}`;
      const bucket = grid.get(key);
      if (!bucket) return;

      bucket.forEach(other => {
        if (other.id <= n.id) return;

        const dx = n.x - other.x;
        const dy = n.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          edges.push({ a: n, b: other, dist });

          n.neighbours.push(other);
          other.neighbours.push(n);
        }
      });
    });
  });

  return edges;
}
