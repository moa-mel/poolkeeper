# Poolkeeper — Instant Launch Strategy & Readiness Game

Poolkeeper is a two-part strategy game and readiness tool built around Loadout Instant Launches. Players first prepare and manage a simulated token launch, then test their economic decision-making skills in a five-round crisis campaign.

**No wallet or account required.** All market events, allocations, and outcomes are simulated. No real tokens or funds are involved.

## How to Test

### Live Demo

[https://poolkeeper.onrender.com](https://poolkeeper.onrender.com)

### Run Locally

```bash
git clone https://github.com/moa-mel/poolkeeper.git
cd poolkeeper
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## The Two Game Modes

Poolkeeper contains two connected but independently playable modes. Together, they create a complete experience that takes players from launch strategy to economic crisis management.

### 1. Launch Simulator — Prepare and Launch

The Launch Simulator introduces players to the decisions involved in launching and growing a token through a simulated bonding curve.

Players respond to market events across five rounds by balancing:

- **Staking:** Generate simulated rewards and support growth.
- **Curve Liquidity:** Maintain liquidity and manage slippage.
- **Anti-Snipe Reserve:** Protect the pool against adverse market activity.

The goal is to reach the simulated 85 SOL graduation target while surviving market events and maintaining pool health.

At the end, players receive a score, rank, graduation result, and round-by-round performance history.

### 2. Game Economy Crisis Mode — Survive the Economy

After completing the Launch Simulator, players can return to the mode-selection screen and choose **Play Game Economy Crisis Mode**.

This mode shifts the challenge from launching a token to managing an established game economy under pressure. Players face five economic crises and must allocate limited resources to protect the ecosystem.

Players balance:

- **Liquidity Support:** Help maintain liquidity during market disruptions.
- **Emergency Reserve:** Preserve resources for unexpected shocks.
- **Buyback Support:** Support simulated market demand and confidence.

Each crisis changes the state of the economy. Players must adapt their allocations based on remaining treasury, liquidity, and pool health.

The objective is to survive all five crises without exhausting the economy's critical resources.

### Why Both Modes Make a Complete Game

The two modes explore different stages of token and game-economy management:

| Launch Simulator | Game Economy Crisis Mode |
|---|---|
| Focuses on launch strategy and growth | Focuses on economic resilience and survival |
| Builds toward simulated graduation | Responds to escalating economic crises |
| Teaches liquidity, staking, and anti-snipe allocation | Teaches treasury, liquidity, and emergency resource management |
| Rewards healthy launch decisions | Rewards adaptive crisis management |

Together, the modes let players experience both sides of the challenge: **building a healthy launch and keeping its economy resilient under pressure.**

## What Is Poolkeeper?

Poolkeeper is a strategy and readiness layer built on top of Loadout Instant Launches.

Loadout makes it possible to launch a game token in minutes. Poolkeeper helps creators explore launch decisions and understand trade-offs involving healthy graduation, liquidity depth, anti-snipe protection, and allocation strategy.

Poolkeeper is **not a replacement for Instant Launch**. It is an additional decision-support and educational tool that helps creators prepare for and reason about launch strategies.

## What Poolkeeper Adds to Instant Launch

- **Pre-Launch Readiness Score** — Assess your project before launching.
- **Strategy Coach** — Explore recommendations during the bonding curve.
- **Graduation Probability Simulator** — Explore how allocation choices affect the simulated chance of reaching the 85 SOL graduation target.
- **Anti-Snipe + Liquidity Optimizer** — Balance protection and liquidity depth under simulated market pressure.
- **Exportable Strategy Summary** — Take recommended settings into your real Instant Launch workflow.

## Built For

Game creators using Loadout Instant Launches who want to make more informed launch decisions, and players interested in learning about token launch strategy and game-economy management.

## Project

- **Live demo:** [poolkeeper.onrender.com](https://poolkeeper.onrender.com)
- **GitHub:** [moa-mel/poolkeeper](https://github.com/moa-mel/poolkeeper)
