
import {
  Trophy,
  RotateCcw,
  ShieldCheck,
  Coins,
  Activity,
  TrendingUp,
} from "lucide-react";

import type { GameState } from "../game/game.types";
import { getRank, getAverageHealth } from "../game/game.scoring";

interface Props {
  game: GameState;
  onRestart: () => void;
}

export default function GameResults({
  game,
  onRestart,
}: Props) {
  const won = game.status === "won";
  const rank = getRank(game.score);

  return (
    <main className="results-page">
      <div className="results-card">
        <div className={`results-icon ${won ? "won" : "lost"}`}>
          {won ? <Trophy size={38} /> : <ShieldCheck size={38} />}
        </div>

        <span className="eyebrow">MISSION COMPLETE</span>

        <h1>
          {won ? "Pool protected!" : "Pool collapsed"}
        </h1>

        <p className="results-description">
          {won
            ? "You survived all five market events and kept your liquidity pool alive."
            : "Your pool lost all its health before you could complete the mission."}
        </p>

        <div className="rank-display">
          <span>YOUR RANK</span>
          <strong>{rank}</strong>
        </div>

        <div className="results-stats">
          <ResultStat
            icon={<Trophy />}
            label="FINAL SCORE"
            value={game.score.toLocaleString()}
          />

          <ResultStat
            icon={<Activity />}
            label="AVERAGE HEALTH"
            value={`${getAverageHealth(game)}%`}
          />

          <ResultStat
            icon={<Coins />}
            label="REWARDS EARNED"
            value={game.rewards.toFixed(2)}
          />

          <ResultStat
            icon={<TrendingUp />}
            label="TOTAL STAKED"
            value={`${game.staked}`}
          />
        </div>

        <div className="history-section">
          <h3>Mission history</h3>

          {game.history.map((item) => (
            <div className="history-row" key={item.round}>
              <span>ROUND {item.round}</span>
              <span>{item.event}</span>
              <strong>{item.poolHealth}% health</strong>
            </div>
          ))}
        </div>

        <button className="primary-button restart-button" onClick={onRestart}>
          <RotateCcw size={17} />
          Play Again
        </button>

        <p className="simulation-note">
          All scores, energy and rewards are simulated.
          No real assets were deposited or earned.
        </p>
      </div>
    </main>
  );
}

function ResultStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="result-stat">
      <div>{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
