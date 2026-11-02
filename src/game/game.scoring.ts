
import type { GameState } from "./game.types";

export function getRank(score: number): string {
  if (score >= 1400) return "Liquidity Legend";
  if (score >= 1100) return "Pool Guardian";
  if (score >= 800) return "Market Strategist";
  if (score >= 500) return "Rising Investor";

  return "Pool Beginner";
}

export function getAverageHealth(state: GameState): number {
  if (!state.history.length) return state.poolHealth;

  const total = state.history.reduce(
    (sum, round) => sum + round.poolHealth,
    0
  );

  return Math.round(total / state.history.length);
}
