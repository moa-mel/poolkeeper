
import type {
  Allocation,
  GameState,
  MarketEvent,
  RoundResult,
} from "./game.types";

import {
  REWARD_RATE,
  TOTAL_ENERGY,
  TOTAL_ROUNDS,
} from "./game.constants";

export function validateAllocation(
  allocation: Allocation
): boolean {
  const values = [
    allocation.stake,
    allocation.liquidity,
    allocation.reserve,
  ];

  return (
    values.every(
      (value) =>
        Number.isFinite(value) &&
        Number.isInteger(value) &&
        value >= 0
    ) &&
    values.reduce((sum, value) => sum + value, 0) ===
      TOTAL_ENERGY
  );
}

export function processRound(
  state: GameState,
  allocation: Allocation,
  event: MarketEvent
): GameState {
  if (!validateAllocation(allocation)) {
    throw new Error("Your allocation must equal 100 energy units.");
  }

  const rewardsEarned = Number(
    (allocation.stake * REWARD_RATE).toFixed(2)
  );

  // Reserve protects against market damage.
  const reserveProtection = allocation.reserve * 0.4;

  // Liquidity also absorbs some market pressure.
  const liquidityProtection = allocation.liquidity * 0.15;

  const damage = Math.max(
    0,
    event.severity -
      reserveProtection -
      liquidityProtection
  );

  const poolHealth = Math.max(
    0,
    Math.min(100, state.poolHealth - damage)
  );

  // Liquidity grows when players allocate more resources.
  let liquidityChange = allocation.liquidity * 0.2;

  if (event.type === "withdrawal") {
    liquidityChange -= 12;
  }

  if (event.type === "trade") {
    liquidityChange -= 5;
  }

  const liquidity = Math.max(
    0,
    state.liquidity + liquidityChange
  );

  const staked = state.staked + allocation.stake;

  const rewards = Number(
    (state.rewards + rewardsEarned).toFixed(2)
  );

  const score = Math.max(
    0,
    Math.round(
      poolHealth * 10 +
        liquidity * 2 +
        rewards * 20
    )
  );

  const result: RoundResult = {
    round: state.round,
    event: event.title,
    allocation,
    damage,
    rewardsEarned,
    poolHealth,
    liquidity,
    score,
  };

  const history = [...state.history, result];

  const isLost = poolHealth <= 0;

  const isWon = state.round >= TOTAL_ROUNDS && !isLost;

  return {
    ...state,
    round: isWon || isLost ? state.round : state.round + 1,
    poolHealth,
    liquidity,
    staked,
    rewards,
    energy: TOTAL_ENERGY,
    score,
    status: isLost ? "lost" : isWon ? "won" : "playing",
    currentEvent: null,
    allocation: {
      stake: 40,
      liquidity: 40,
      reserve: 20,
    },
    history,
  };
}
