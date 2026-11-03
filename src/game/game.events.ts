
import type { MarketEvent, RoundResult } from "./game.types";

export const MARKET_EVENTS: MarketEvent[] = [
  {
    id: "staking-demand",
    title: "Staking Demand Surge",
    description:
      "More participants are committing assets to staking. Rewards are attractive, but too much capital leaving available liquidity could weaken the pool.",
    severity: 12,
    type: "staking",
    tradePressure: 5,
    liquidityShock: 4,
    rewardMultiplier: 1.25,
    recommendation:
      "Take advantage of staking rewards without sacrificing too much available liquidity.",
  },
  {
    id: "volatility",
    title: "Market Volatility",
    description:
      "Sudden price movements are putting pressure on the ecosystem. Your reserves will determine how much damage the pool absorbs.",
    severity: 25,
    type: "volatility",
    tradePressure: 18,
    liquidityShock: 5,
    recommendation:
      "Maintain sufficient reserves to absorb market volatility.",
  },
  {
    id: "withdrawal",
    title: "Whale Withdrawal",
    description:
      "A large liquidity provider is withdrawing assets, reducing available liquidity and increasing market pressure.",
    severity: 30,
    type: "withdrawal",
    tradePressure: 24,
    liquidityShock: 18,
    recommendation:
      "Prioritise available liquidity and use reserves to protect pool stability.",
  },
  {
    id: "trade",
    title: "Large Market Trade",
    description:
      "A large trade is moving through the market. Insufficient liquidity could cause significant slippage.",
    severity: 22,
    type: "trade",
    tradePressure: 35,
    liquidityShock: 8,
    recommendation:
      "Increase liquidity to reduce the impact of large trades.",
  },
  {
    id: "attack",
    title: "Liquidity Crisis",
    description:
      "Aggressive market activity is threatening the pool. Poor allocation decisions could leave the ecosystem vulnerable.",
    severity: 35,
    type: "attack",
    tradePressure: 40,
    liquidityShock: 15,
    recommendation:
      "Use your reserves strategically and maintain enough liquidity to withstand market pressure.",
  },
];


export function getRandomEvent(
  round: number,
  history: RoundResult[] = []
): MarketEvent {
  // Guarantee Whale Withdrawal appears by round 3.
  const whaleWithdrawal = MARKET_EVENTS.find(
    (event) => event.id === "withdrawal"
  );

  const hasExperiencedWithdrawal = history.some(
    (result) => result.event === "Whale Withdrawal"
  );

  if (
    round >= 3 &&
    !hasExperiencedWithdrawal &&
    whaleWithdrawal
  ) {
    return { ...whaleWithdrawal };
  }

  // Otherwise, select a random event.
  const availableEvents = MARKET_EVENTS.filter(
    (event) => {
      // Avoid repeating the previous event.
      const previousEvent = history[history.length - 1];

      return (
        !previousEvent ||
        previousEvent.event !== event.title
      );
    }
  );

  const events =
    availableEvents.length > 0
      ? availableEvents
      : MARKET_EVENTS;

  const index = Math.floor(Math.random() * events.length);

  return { ...events[index] };
}

