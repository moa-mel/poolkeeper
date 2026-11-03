
import type {
  Allocation,
  GameState,
  MarketEvent,
  RoundResult,
} from "./game.types";

import {
  INITIAL_ALLOCATION,
  ROUND_REWARD_EMISSION,
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

function clamp(
  value: number,
  min: number,
  max: number
): number {
  return Math.max(min, Math.min(max, value));
}

function calculateSlippage(
  tradePressure: number,
  liquidity: number
): number {
  if (liquidity <= 0) return 50;

  const slippage =
    (tradePressure / (liquidity + tradePressure)) * 100;

  return Number(clamp(slippage, 0, 50).toFixed(2));
}

function calculateSustainability(
  poolHealth: number,
  liquidity: number,
  slippage: number,
  reserveAllocation: number
): number {
  const liquidityHealth = clamp(liquidity, 0, 100);

  const slippageHealth = 100 - clamp(
    slippage * 4,
    0,
    100
  );

  const reserveHealth = clamp(
    reserveAllocation * 2.5,
    0,
    100
  );

  const sustainability =
    poolHealth * 0.4 +
    liquidityHealth * 0.25 +
    slippageHealth * 0.25 +
    reserveHealth * 0.1;

  return Math.round(clamp(sustainability, 0, 100));
}

export function processRound(
  state: GameState,
  allocation: Allocation,
  event: MarketEvent
): GameState {
  if (!validateAllocation(allocation)) {
    throw new Error(
      "Your allocation must equal 100 energy units."
    );
  }

  if (state.status !== "playing") {
    throw new Error("The game is not currently active.");
  }

  if (state.history.length >= TOTAL_ROUNDS) {
    throw new Error("All game rounds have been completed.");
  }

  // 1. Calculate staking rewards.
  // Rewards are game credits, not actual LOAD tokens.
  const rewardMultiplier = event.rewardMultiplier ?? 1;

  const availableEmission = Math.min(
    state.rewardPoolRemaining,
    ROUND_REWARD_EMISSION * rewardMultiplier
  );

  const rewardsEarned = Number(
    (
      availableEmission *
      (allocation.stake / TOTAL_ENERGY)
    ).toFixed(2)
  );

  const rewardPoolRemaining = Number(
    Math.max(
      0,
      state.rewardPoolRemaining - rewardsEarned
    ).toFixed(2)
  );

  const rewards = Number(
    (state.rewards + rewardsEarned).toFixed(2)
  );

  // 2. Calculate liquidity changes.
  const liquidityAdded = allocation.liquidity * 0.3;

  const liquidityShock = event.liquidityShock ?? 0;

  const liquidity = Number(
    Math.max(
      0,
      state.liquidity + liquidityAdded - liquidityShock
    ).toFixed(2)
  );

  // 3. Calculate slippage using available liquidity.
  const tradePressure = event.tradePressure ?? 10;

  console.log("EVENT BEING PROCESSED:", {
    title: event.title,
    tradePressure: event.tradePressure,
    liquidityShock: event.liquidityShock,
    liquidity,
  });

  const slippage = calculateSlippage(
    tradePressure,
    liquidity
  );

  // 4. Calculate protection against market damage.
  const reserveProtection = allocation.reserve * 0.45;

  const liquidityProtection = allocation.liquidity * 0.12;

  const slippageDamage = slippage * 0.15;

  const damage = Number(
    Math.max(
      0,
      event.severity +
      slippageDamage -
      reserveProtection -
      liquidityProtection
    ).toFixed(2)
  );

  const poolHealth = Number(
    clamp(state.poolHealth - damage, 0, 100).toFixed(2)
  );

  // 5. Track cumulative staking allocation.
  const staked = Number(
    (state.staked + allocation.stake).toFixed(2)
  );

  // 6. Calculate sustainability.
  const sustainabilityScore = calculateSustainability(
    poolHealth,
    liquidity,
    slippage,
    allocation.reserve
  );


  // 7. Score the round.
  const roundScore = Math.round(
    poolHealth * 4 +
    Math.min(liquidity, 100) * 2 +
    rewardsEarned * 10 +
    sustainabilityScore * 3
  );

  const score = state.score + roundScore;

  // 8. Record the round.
  const result: RoundResult = {
    round: state.round,
    event: event.title,
    allocation: { ...allocation },
    damage,
    rewardsEarned,
    poolHealth,
    liquidity,
    slippage,
    rewardPoolRemaining,
    sustainabilityScore,
    score,
  };

  const history = [...state.history, result];

  const isLost = poolHealth <= 0 || liquidity <= 0;

  const isWon =
    history.length >= TOTAL_ROUNDS && !isLost;

  return {
    ...state,
    round:
      isWon || isLost
        ? state.round
        : state.round + 1,
    poolHealth,
    liquidity,
    staked,
    rewards,
    rewardPoolRemaining,
    slippage,
    sustainabilityScore,
    energy: TOTAL_ENERGY,
    score,
    status: isLost
      ? "lost"
      : isWon
        ? "won"
        : "playing",
    currentEvent: null,
    allocation: { ...INITIAL_ALLOCATION },
    history,
  };
}
