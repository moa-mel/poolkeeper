
import type { MarketEvent } from "./game.types";

export const MARKET_EVENTS: MarketEvent[] = [
  {
    id: "volatility",
    title: "Market Volatility",
    description:
      "A sudden market movement is threatening the stability of your liquidity pool.",
    severity: 24,
    type: "volatility",
    recommendation:
      "Maintain sufficient reserves to absorb market volatility.",
  },
  {
    id: "withdrawal",
    title: "Whale Withdrawal",
    description:
      "A major liquidity provider is preparing to withdraw a significant amount of liquidity.",
    severity: 28,
    type: "withdrawal",
    recommendation:
      "Increase liquidity allocation to protect pool depth.",
  },
  {
    id: "trade",
    title: "Large Market Trade",
    description:
      "A large trade is creating pressure on your pool and increasing slippage.",
    severity: 20,
    type: "trade",
    recommendation:
      "Strengthen liquidity to reduce the impact of large trades.",
  },
  {
    id: "attack",
    title: "Liquidity Attack",
    description:
      "An aggressive market participant is attempting to destabilize your pool.",
    severity: 32,
    type: "attack",
    recommendation:
      "Keep enough resources in reserve to defend the pool.",
  },
];

export function getRandomEvent(): MarketEvent {
  const index = Math.floor(Math.random() * MARKET_EVENTS.length);

  return { ...MARKET_EVENTS[index] };
}
