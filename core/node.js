export class Node {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;

    this.baseX = this.x;
    this.baseY = this.y;
    
    this.dead = false;     // 是否死亡
    this.age = 0;          // 用于寿命

    this.energy = Math.random();
    this.neighbours = [];
    this.zoneBias = 0; // 分区能量偏移
  }

  update(t) {
    const base = 0.5 + 0.5 * Math.sin(t * 0.002 + this.id * 0.3);
    const neighborFactor = Math.min(1, this.neighbours.length / 8);
    const noise = (Math.random() - 0.5) * 0.1;

    this.energy = base * 0.6 + neighborFactor * 0.4 + noise + this.zoneBias;

    if (this.neighbours.length > 0) {
      const avg = this.neighbours.reduce((s, o) => s + o.energy, 0) / this.neighbours.length;
      this.energy = this.energy * 0.7 + avg * 0.3;
    }

    this.energy = Math.max(0, Math.min(1, this.energy));

    this.colorPhase = (t * 0.001 + this.id * 0.1) % 1;

    const driftRadius = 200;
    const driftSpeed = 0.0005;

    this.x = this.baseX + Math.sin(this.id * 0.3 + t * driftSpeed) * driftRadius;
    this.y = this.baseY + Math.cos(this.id * 0.3 + t * driftSpeed) * driftRadius;

    // --- 死亡条件 ---
    // 1. 能量过低死亡
    if (this.energy < 0.005) {
      this.dead = true;
    }   

    // 2. 年龄过大死亡（可选）
    this.age++;
    if (this.age > 20000) {   // 大约 5 分钟寿命
      this.dead = true;
    }
  }
}
