export type GameStatus = "idle" | "playing" | "won" | "lost";

export type EventType =
  | "volatility"
  | "withdrawal"
  | "trade"
  | "attack"
  | "staking";

export interface Allocation {
  stake: number;
  liquidity: number;
  reserve: number;
}

export interface GameState {
  round: number;
  poolHealth: number;
  liquidity: number;
  graduationSol: number;
  staked: number;
  rewards: number;
  rewardPoolRemaining: number;
  slippage: number;
  sustainabilityScore: number;
  energy: number;
  score: number;
  status: GameStatus;
  currentEvent: MarketEvent | null;
  allocation: Allocation;
  history: RoundResult[];
}

export interface MarketEvent {
  id: string;
  title: string;
  description: string;
  severity: number;
  type: EventType;
  recommendation: string;
  tradePressure?: number;
  liquidityShock?: number;
  rewardMultiplier?: number;
  graduationDemand?: number;
}

export interface RoundResult {
  round: number;
  event: string;
  allocation: Allocation;
  damage: number;
  rewardsEarned: number;
  poolHealth: number;
  liquidity: number;
  slippage: number;
  graduationSol: number;
  rewardPoolRemaining: number;
  sustainabilityScore: number;
  score: number;
}