
export type GameStatus = "idle" | "playing" | "won" | "lost";

export type EventType =
  | "volatility"
  | "withdrawal"
  | "trade"
  | "attack";

export interface Allocation {
  stake: number;
  liquidity: number;
  reserve: number;
}

export interface GameState {
  round: number;
  poolHealth: number;
  liquidity: number;
  staked: number;
  rewards: number;
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
}

export interface RoundResult {
  round: number;
  event: string;
  allocation: Allocation;
  damage: number;
  rewardsEarned: number;
  poolHealth: number;
  liquidity: number;
  score: number;
}
