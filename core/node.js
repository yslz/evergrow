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
    // 呼吸
    this.energy = 0.5 + 0.5 * Math.sin(t * 0.02 + this.id);
    this.glow = this.energy;

    // 状态衰退
    this.decayTimer += 1;
    if (this.decayTimer > 500 && this.lifeState === "alive") {
      this.lifeState = "weak";
    }
    if (this.decayTimer > 1000 && this.lifeState === "weak") {
      this.lifeState = "offline";
    }
  }
}
