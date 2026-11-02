

# Poolkeeper — The Liquidity Wars

Poolkeeper is a DeFi-inspired strategy simulation game where players take on the role of liquidity pool managers. Your mission is to manage resources, respond to unpredictable market conditions, and keep your liquidity pool healthy through five challenging rounds.

## How to Test

**No account, wallet connection, private key, or faucet is required.**

Poolkeeper is a simulation game. All resources, market events, and rewards are simulated. No real cryptocurrency or on-chain transactions are involved.

### Run Live
https://poolkeeper.onrender.com

### Run Locally

**Requirements:** Node.js 20+ and npm.

1. Clone the repository:

```bash
git clone https://github.com/moa-mel/poolkeeper.git
```

2. Navigate into the project:

```bash
cd poolkeeper
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in your terminal (usually `http://localhost:5173`).

### Test the Gameplay

1. Launch the game and start a new session.
2. Allocate your available energy across staking, liquidity, and reserves.
3. Review the market event presented in each round.
4. Make decisions based on the event and your pool's current condition.
5. Monitor changes in pool health, liquidity depth, slippage, and simulated rewards.
6. Complete all five rounds and review your final score.
7. Restart the game and experiment with different resource allocations to see how your decisions affect the outcome.

### Verify the Build

Run the following commands to check the project:

```bash
npm run build
npm run lint
```

## Gameplay

Players must balance three important resources:

- **Stake:** Allocate resources toward staking and simulated rewards.
- **Liquidity:** Maintain pool depth and help reduce slippage.
- **Reserve:** Keep resources available to respond to unexpected market events.

Throughout the game, players encounter simulated market conditions such as:

- Market volatility.
- Large trades.
- Liquidity withdrawals.
- Unexpected attacks.

Every decision affects the pool's condition. Poor resource allocation can put the pool at risk, while strategic decisions help maintain stability and survive all five rounds.

## Features

- Interactive resource allocation.
- Dynamic market event scenarios.
- Real-time pool health monitoring.
- Liquidity depth and slippage tracking.
- Simulated staking rewards.
- Five-round survival challenge.
- End-of-game scoring and results.

## Tech Stack

- **React** — User interface.
- **TypeScript** — Type safety.
- **Vite** — Development and build tooling.
- **Zustand** — Game state management.
- **Tailwind CSS** — Styling.
- **Lucide React** — Icons.

## Project Structure

```text
src/
├── components/
├── pages/
├── services/
├── store/
├── types/
└── App.tsx
```

## Important Note

Poolkeeper is an educational strategy simulation and hackathon prototype. It demonstrates simplified liquidity-management concepts. It does not connect to a blockchain, execute real financial transactions, or distribute real cryptocurrency rewards.

## Contributing

Contributions, suggestions, and feedback are welcome.

---

**Poolkeeper — Manage the liquidity. Survive the market.**

