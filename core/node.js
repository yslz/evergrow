// core/node.js

export class Node {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;

    this.size = 2 + Math.random() * 1.5;
    this.glow = Math.random() * 0.5;
    this.alive = true;

    this.neighbors = []; // 连接的其他节点

    // 未来：真实链节点信息
    this.address = null;
    this.latency = null;
    this.stake = null;
  }

  update(tick) {
    // 心跳驱动的呼吸
    this.glow = 0.3 + 0.2 * Math.sin(tick * 0.5);

    // 未来：节点漂移、状态变化、网络拓扑更新
  }

  distanceTo(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // 未来：连接关系
  connect(other) {
    // 未来实现
  }
}
