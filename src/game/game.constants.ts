import type { Allocation, GameState } from "./game.types";

export const TOTAL_ROUNDS = 5;
export const TOTAL_ENERGY = 100;
export const GRADUATION_TARGET_SOL = 85;

export const SIMULATED_REWARD_POOL = 100;

export const ROUND_REWARD_EMISSION =
  SIMULATED_REWARD_POOL / TOTAL_ROUNDS;

export const INITIAL_ALLOCATION: Allocation = {
  stake: 40,
  liquidity: 40,
  reserve: 20,
};

export const INITIAL_STATE: GameState = {
  round: 1,
  poolHealth: 100,
  liquidity: 100,
  graduationSol: 0,
  staked: 0,
  rewards: 0,
  rewardPoolRemaining: SIMULATED_REWARD_POOL,
  slippage: 0,
  sustainabilityScore: 100,
  energy: TOTAL_ENERGY,
  score: 0,
  status: "idle",
  currentEvent: null,
  allocation: INITIAL_ALLOCATION,
  history: [],
};

export const REWARD_RATE = 0.04;