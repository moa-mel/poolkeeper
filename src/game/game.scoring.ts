
import type { GameState } from "./game.types";

export function getRank(score: number): string {
  if (score >= 3500) return "Liquidity Legend";
  if (score >= 2800) return "Pool Guardian";
  if (score >= 2000) return "Market Strategist";
  if (score >= 1000) return "Staking Defender";

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

export function getAverageSustainability(
  state: GameState
): number {
  if (!state.history.length) {
    return state.sustainabilityScore;
  }

  const total = state.history.reduce(
    (sum, round) => sum + round.sustainabilityScore,
    0
  );

  return Math.round(total / state.history.length);
}

export function getAverageSlippage(state: GameState): number {
  if (!state.history.length) return state.slippage;

  const total = state.history.reduce(
    (sum, round) => sum + round.slippage,
    0
  );

  return Number(
    (total / state.history.length).toFixed(2)
  );
}
