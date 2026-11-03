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
  Rocket,
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

        <span className="eyebrow">
          {won ? "STRATEGY SESSION COMPLETE" : "STRATEGY FAILED"}
        </span>

        <h1>
          {won
            ? "Token graduated!"
            : game.poolHealth <= 0 || game.liquidity <= 0
              ? "Pool collapsed"
              : "Graduation target missed"}
        </h1>

        <p className="results-description">
          {won
            ? "You survived all five market events and reached the simulated 85 SOL graduation target."
            : game.poolHealth <= 0 || game.liquidity <= 0
              ? "Your pool lost its health or liquidity before graduation."
              : "You survived all five rounds, but your simulated graduation progress did not reach 85 SOL."}
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

        {/* Strong CTA for Loadout Instant Launch */}
        <div className="loadout-cta">
          <Rocket size={20} />
          <strong>Ready to use this strategy for real?</strong>
          <p>
            Take these recommendations into your actual Instant Launch on Loadout.
          </p>
          <a href="https://app.loadout.xyz" target="_blank" rel="noopener noreferrer">
            Open Loadout Instant Launch
          </a>
        </div>

        <div className="history-section">
          <div className="history-heading">
            <div>
              <h3>Mission history</h3>
              <p>Round-by-round bonding curve performance and resource allocation.</p>
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
                  <strong>Round {item.round}</strong>
                  <span>{item.event}</span>
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
                    <span>Buyback/Stake: {item.allocation.stake}</span>
                    <span>Curve Liquidity: {item.allocation.liquidity}</span>
                    <span>Anti-Snipe: {item.allocation.reserve}</span>
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
          This is an educational demo of Loadout Instant Launch mechanics.
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