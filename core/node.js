export class Node {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;

    // 状态
    this.lifeState = "alive";
    this.energy = Math.random();
    this.load = 0;
    this.decayTimer = 0;

    // 感知
    this.neighbours = [];

    // 视觉
    this.size = 2 + this.energy * 2;
    this.glow = this.energy;
  }

  update(t) {
  // 基础能量：正弦波 + 随机相位
    const base = 0.5 + 0.5 * Math.sin(t * 0.002 + this.id * 0.3);

  // 邻居影响：邻居越多，能量越稳定、越亮
    const neighborFactor = Math.min(1, this.neighbours.length / 8);

  // 噪声扰动：让能量更有机
    const noise = (Math.random() - 0.5) * 0.1;

  // 最终能量
    this.energy = base * 0.6 + neighborFactor * 0.4 + noise;
  // 邻居共振：能量向邻居平均值靠拢
    if (this.neighbours.length > 0) {
      const avg = this.neighbours.reduce((s, o) => s + o.energy, 0) / this.neighbours.length;
      this.energy = this.energy * 0.7 + avg * 0.3;
    }

  // 限制范围
    this.energy = Math.max(0, Math.min(1, this.energy));

  // 颜色相位：让每个节点有自己的色彩节奏
    this.colorPhase = (t * 0.001 + this.id * 0.1) % 1;

    this.x += Math.sin(this.id * 0.3 + t * 0.0005) * 0.2;
    this.y += Math.cos(this.id * 0.3 + t * 0.0005) * 0.2;

    if (this.neighbours.length > 0) {
      const avg = this.neighbours.reduce((s, o) => s + o.energy, 0) / this.neighbours.length;
      this.energy += (avg - this.energy) * 0.05;
    }
    // 节点漂移：平滑、缓慢、有相位差
    const speed = 0.2; // 漂移速度（可调）
    this.x += Math.sin(this.id * 0.3 + t * 0.0005) * speed;
    this.y += Math.cos(this.id * 0.3 + t * 0.0005) * speed;

    // 边界处理：反弹
    if (this.x < 0) this.x = 0;
    if (this.x > window.innerWidth) this.x = window.innerWidth;
    if (this.y < 0) this.y = 0;
    if (this.y > window.innerHeight) this.y = window.innerHeight;

  }
  
}
