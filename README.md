Evergrow
  Evergrow 是一个基于 局部规则（local rules） 和 空间结构（spatial structure） 的可视化生命系统。
  它模拟了一个由节点组成的网络，这些节点通过简单的规则、心跳驱动和空间邻域关系，形成不断演化的拓扑结构。

  项目的目标不是构建一个“上帝视角”的模拟器，而是探索：
  当每个节点只依赖局部信息时，复杂结构如何自然涌现（emerge）？

✨ 特性
  模块化架构：core / visual / renderer 完全分离

  局部规则驱动：节点只感知 maxDist 范围内的邻居

  空间分区（Grid）：高效邻居搜索，支持大规模节点

  心跳系统（Clock）：统一的时间驱动

  节点生命行为（Node）：呼吸、漂移、状态更新

  动态网络拓扑（Network）：基于距离的连接关系

  可扩展渲染管线（Renderer）：节点、连线、UI 分层绘制

🌱 核心理念
  局部规则（Local Rules）
    每个节点只知道：

    自己的位置

    自己的状态

    距离小于 maxDist 的邻居

    它不知道全局拓扑，也不需要全局信息。

  空间结构（Spatial Structure）
    为了让局部规则在大规模节点下可运行，系统使用 Grid 空间分区 来加速邻居搜索。

    Grid 不是规则的一部分，而是工程层的优化：
    它让节点仍然只看到局部世界，但计算机不必做 O(n²) 的全局扫描。

  涌现（Emergence）
    当节点遵循简单的局部规则时，整体网络会呈现：

    聚集

    分形结构

    呼吸节奏

    拓扑变化

    这些都是系统自然涌现的，而不是预设的。

🧱 项目结构
Code
src/
  core/
    clock.js        # 心跳系统
    node.js         # 节点类（生命体）
    network.js      # 网络拓扑逻辑（距离连接）
    grid.js         # 空间分区（邻居加速）
  visual/
    renderer.js     # 渲染管线（节点、连线、UI）
  main.js           # 系统 orchestrator（调度）
  index.html        # 入口页面
🧬 模块说明
  core/clock.js
  提供统一的 tick（心跳）

  所有节点和网络更新都基于 tick

  core/node.js
  节点的生命体模型

  包含位置、状态、呼吸动画、未来可扩展行为

  core/network.js
  基于距离的连接关系

  可替换为真实 P2P 拓扑（libp2p / Kademlia）

  core/grid.js
  空间分区（Grid）

  将邻居搜索从 O(n²) 降到 O(n)

  保证局部规则不变

  visual/renderer.js
  负责所有绘图

  drawNodes / drawEdges / drawUI

  与逻辑完全解耦

  main.js
  系统 orchestrator

  初始化节点

  调用 grid 计算邻居

  调用 renderer 绘制

  订阅 clock 更新

  🚀 运行方式
  无需构建工具，直接打开 index.html 即可运行：

  Code
  open index.html
  或使用任意静态服务器：

  Code
  npx serve
  🔧 可配置参数（在 main.js 中）
  js
  const NODE_COUNT = 300;
  const MAX_DIST = 80;      // 邻居感知范围
  const CELL_SIZE = 80;     // Grid 分区大小（>= MAX_DIST）
  你可以通过调整这些参数来改变：

  网络密度

  性能表现

  涌现结构的形态

🧭 未来路线图
  1. 节点行为扩展
    漂移（Brownian / Perlin noise）

    状态变化（alive / offline / lagging）

    连接权重（延迟、带宽）

  2. 真实网络拓扑
    接入真实区块链节点数据

    模拟 libp2p / Kademlia 路由

    动态邻居选择

  3. 渲染增强
    GPU 加速（WebGL / WebGPU）

    粒子效果

    节点标签、交互

  4. 自适应性能系统
    根据 FPS 自动调整 cellSize

    根据节点数量自动调整 maxDist

    动态 grid 重建

🌀 Evergrow 的愿景
  Evergrow 不只是一个可视化项目。
  它是一个关于 生命、结构、局部规则、涌现 的实验平台。

  它探索的问题是：

  当每个节点只知道自己的局部世界时，
  复杂的结构如何自然生长？
