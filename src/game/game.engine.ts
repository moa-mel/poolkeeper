import type {
  Allocation,
  GameState,
  MarketEvent,
  RoundResult,
} from "./game.types";

import {
  GRADUATION_TARGET_SOL,
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
    values.reduce((sum, value) => sum + value, 0) === TOTAL_ENERGY
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function calculateSlippage(
  tradePressure: number,
  liquidity: number
): number {
  if (liquidity <= 0) return 50;

  return Number(
    clamp(
      (tradePressure / (liquidity + tradePressure)) * 100,
      0,
      50
    ).toFixed(2)
  );
}

function calculateSustainability(
  poolHealth: number,
  liquidity: number,
  slippage: number,
  reserveAllocation: number
): number {
  const liquidityHealth = clamp(liquidity, 0, 100);
  const slippageHealth = 100 - clamp(slippage * 4, 0, 100);
  const reserveHealth = clamp(reserveAllocation * 2.5, 0, 100);

  return Math.round(
    clamp(
      poolHealth * 0.4 +
        liquidityHealth * 0.25 +
        slippageHealth * 0.25 +
        reserveHealth * 0.1,
      0,
      100
    )
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

  if (state.status !== "playing") {
    throw new Error("The game is not currently active.");
  }

  if (state.history.length >= TOTAL_ROUNDS) {
    throw new Error("All game rounds have been completed.");
  }

  // Simulated rewards, not real tokens.
  const availableEmission = Math.min(
    state.rewardPoolRemaining,
    ROUND_REWARD_EMISSION * (event.rewardMultiplier ?? 1)
  );

  const rewardsEarned = Number(
    (
      availableEmission *
      (allocation.stake / TOTAL_ENERGY)
    ).toFixed(2)
  );

  const rewardPoolRemaining = Number(
    Math.max(0, state.rewardPoolRemaining - rewardsEarned).toFixed(2)
  );

  const rewards = Number(
    (state.rewards + rewardsEarned).toFixed(2)
  );

  // Liquidity changes.
  const liquidityAdded = allocation.liquidity * 0.3;

  const liquidity = Number(
    Math.max(
      0,
      state.liquidity +
        liquidityAdded -
        (event.liquidityShock ?? 0)
    ).toFixed(2)
  );

  const tradePressure = event.tradePressure ?? 10;

  const slippage = calculateSlippage(
    tradePressure,
    liquidity
  );

  // Pool protection.
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

  // Simulated graduation progress.
  const baseDemand =
    event.graduationDemand ?? tradePressure * 0.5;

  const allocationBoost =
    allocation.liquidity * 0.12 +
    allocation.stake * 0.04;

  const marketImpact =
    slippage * 0.12 +
    (event.liquidityShock ?? 0) * 0.08 +
    damage * 0.04;

  const graduationThisRound = Number(
    Math.max(
      0,
      baseDemand + allocationBoost - marketImpact
    ).toFixed(2)
  );

  const graduationSol = Number(
    Math.min(
      GRADUATION_TARGET_SOL,
      state.graduationSol + graduationThisRound
    ).toFixed(2)
  );

  const staked = Number(
    (state.staked + allocation.stake).toFixed(2)
  );

  const sustainabilityScore = calculateSustainability(
    poolHealth,
    liquidity,
    slippage,
    allocation.reserve
  );

  const roundScore = Math.round(
    poolHealth * 4 +
      Math.min(liquidity, 100) * 2 +
      rewardsEarned * 10 +
      sustainabilityScore * 3 +
      graduationThisRound * 5
  );

  const score = state.score + roundScore;

  const result: RoundResult = {
    round: state.round,
    event: event.title,
    allocation: { ...allocation },
    damage,
    rewardsEarned,
    poolHealth,
    liquidity,
    slippage,
    graduationSol,
    rewardPoolRemaining,
    sustainabilityScore,
    score,
  };

  const history = [...state.history, result];

  const isLost = poolHealth <= 0 || liquidity <= 0;
  const roundsComplete = history.length >= TOTAL_ROUNDS;

  const reachedGraduation =
    graduationSol >= GRADUATION_TARGET_SOL;

  const isWon =
    roundsComplete &&
    reachedGraduation &&
    !isLost;

  const status =
    isLost
      ? "lost"
      : isWon
        ? "won"
        : roundsComplete
          ? "lost"
          : "playing";

  return {
    ...state,
    round:
      status === "playing"
        ? state.round + 1
        : state.round,
    poolHealth,
    liquidity,
    graduationSol,
    staked,
    rewards,
    rewardPoolRemaining,
    slippage,
    sustainabilityScore,
    energy: TOTAL_ENERGY,
    score,
    status,
    currentEvent: null,
    allocation: { ...INITIAL_ALLOCATION },
    history,
  };
}