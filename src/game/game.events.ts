import type { MarketEvent, RoundResult } from "./game.types";

export const MARKET_EVENTS: MarketEvent[] = [
  {
    id: "staking-demand",
    title: "Staking Demand Surge",
    description: "Traders are locking tokens into the staking vault.",
    severity: 12,
    type: "staking",
    tradePressure: 5,
    liquidityShock: 4,
    rewardMultiplier: 1.25,
    graduationDemand: 24,
    recommendation:
      "Allocate some energy to staking while maintaining sufficient curve liquidity.",
  },
  {
    id: "volatility",
    title: "Market Volatility Spike",
    description:
      "Sudden price swings are hitting the bonding curve. Your anti-snipe protection and reserves will determine how much damage the pool absorbs.",
    severity: 25,
    type: "volatility",
    tradePressure: 18,
    liquidityShock: 5,
    recommendation:
      "Maintain sufficient Anti-Snipe Protection to absorb volatility during the protection window.",
  },
  {
    id: "withdrawal",
    title: "Whale Withdrawal",
    description:
      "A large holder is selling into the curve, reducing available liquidity and increasing slippage. Graduation progress is at risk.",
    severity: 30,
    type: "withdrawal",
    tradePressure: 24,
    liquidityShock: 18,
    recommendation:
      "Prioritise Bonding Curve Liquidity and use Anti-Snipe reserves to protect stability.",
  },
  {
    id: "trade",
    title: "Large Market Trade",
    description:
      "A sizeable trade is moving through the bonding curve. Insufficient depth will cause high slippage and hurt graduation momentum.",
    severity: 22,
    type: "trade",
    tradePressure: 35,
    liquidityShock: 8,
    recommendation:
      "Increase Bonding Curve Liquidity to reduce the impact of large trades.",
  },
  {
    id: "attack",
    title: "Snipe Attack",
    description:
      "Aggressive bots are attempting to snipe the early curve. Strong Anti-Snipe Protection is critical to keep the Instant Launch healthy.",
    severity: 35,
    type: "attack",
    tradePressure: 40,
    liquidityShock: 15,
    recommendation:
      "Deploy Anti-Snipe Protection strategically and keep enough curve liquidity to withstand pressure.",
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

  if (round >= 3 && whaleWithdrawal && !hasExperiencedWithdrawal) {
    return whaleWithdrawal;
  }

  // Simple weighted random selection for the rest.
  const available = MARKET_EVENTS.filter((e) => {
    if (round < 3 && e.id === "withdrawal") return false;
    return true;
  });

  const index = Math.floor(Math.random() * available.length);
  return available[index];
}