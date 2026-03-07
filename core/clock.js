// core/clock.js

let tick = 0;
const listeners = [];
let intervalId = null;

export class Clock {
  constructor() {
    this.time = 0;
    this.subscribers = [];
  }

  onTick(fn) {
    this.subscribers.push(fn);
  }

  start() {
    const loop = (t) => {
      this.time = t;
      this.subscribers.forEach(fn => fn(t));
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}


export function onTick(fn) {
  listeners.push(fn);
}

export function startClock(interval = 1000) {
  if (intervalId) return; // 防止重复启动

  intervalId = setInterval(() => {
    tick += 1;
    listeners.forEach(fn => fn(tick));
  }, interval);
}

export function getTick() {
  return tick;
}
