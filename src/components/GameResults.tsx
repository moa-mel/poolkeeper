
import {
  Trophy,
  RotateCcw,
  ShieldCheck,
  Coins,
  Activity,
  TrendingUp,
  Waves,
  Shield,
  Percent,
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
          <div className="history-heading">
            <div>
              <h3>Mission history</h3>
              <p>Round-by-round pool performance and resource allocation.</p>
            </div>

            <span className="history-count">
              {game.history.length}/5 ROUNDS
            </span>
          </div>

          <div className="detailed-history">
            {game.history.map((item) => (
              <article
                className="detailed-history-card"
                key={item.round}
              >
                <div className="detailed-history-header">
                  <div>
                    <span className="round-label">
                      ROUND {item.round}
                    </span>
                    <h4>{item.event}</h4>
                  </div>

                  <span className="round-health">
                    {item.poolHealth.toFixed(1)}% health
                  </span>
                </div>

                <div className="history-metrics">
                  <HistoryMetric
                    icon={<Waves size={16} />}
                    label="Liquidity"
                    value={item.liquidity.toFixed(2)}
                  />

                  <HistoryMetric
                    icon={<Percent size={16} />}
                    label="Slippage"
                    value={`${item.slippage.toFixed(2)}%`}
                  />

                  <HistoryMetric
                    icon={<Shield size={16} />}
                    label="Reserve"
                    value={`${item.allocation.reserve} units`}
                  />

                  <HistoryMetric
                    icon={<Coins size={16} />}
                    label="Rewards"
                    value={item.rewardsEarned.toFixed(2)}
                  />
                </div>

                <div className="history-allocation">
                  <span>Resource allocation</span>

                  <div className="allocation-breakdown">
                    <span>Stake: {item.allocation.stake}</span>
                    <span>Liquidity: {item.allocation.liquidity}</span>
                    <span>Reserve: {item.allocation.reserve}</span>
                  </div>
                </div>

                <div className="history-damage">
                  <span>Pool damage</span>
                  <strong>{item.damage.toFixed(2)}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          className="primary-button restart-button"
          onClick={onRestart}
        >
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

function HistoryMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="history-metric">
      <div className="history-metric-label">
        {icon}
        <span>{label}</span>
      </div>

      <strong>{value}</strong>
    </div>
  );
}
