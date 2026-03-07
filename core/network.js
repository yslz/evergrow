// core/network.js

export function computeConnections(nodes, maxDistance = 120) {
  const edges = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];

      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDistance) {
        edges.push({
          a,
          b,
          dist
        });
      }
    }
  }

  return edges;
}
