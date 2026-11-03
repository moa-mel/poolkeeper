import {
  Shield,
  Waves,
  Lock,
  Zap,
  ArrowRight,
  Activity,
} from "lucide-react";

import GameHeader from "../components/GameHeader";

interface Props {
  onStart: () => void;
  onStartCrisis: () => void;
  loading: boolean;
}

export default function Home({ onStart, onStartCrisis, loading }: Props) {
  return (
    <div className="app-shell">
      <GameHeader />

      <main className="home-page">
        <div className="hero-section">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="live-indicator" />
              LOADOUT INSTANT LAUNCH SIMULATOR
            </div>

            <h1>
              Build a strategy. Survive the market.
            </h1>

            <p>
              Test how liquidity, staking and reserves affect a simulated
              token launch across changing market conditions.
            </p>

            <button
              className="primary-button hero-button"
              onClick={onStart}
              disabled={loading}
            >
              {loading ? "Preparing launch..." : "Start Instant Launch Simulation"}
              <ArrowRight size={19} />
            </button>

            <div className="hero-footnote">
              <Shield size={15} />
              No wallet required · Free simulation of Loadout Instant Launch
            </div>
          </div>

          <div className="hero-visual product-preview">
            <div className="preview-header">
              <div>
                <span>INSTANT LAUNCH OVERVIEW</span>
                <button
                  className="secondary-button hero-button"
                  onClick={onStartCrisis}
                >
                  Play Game Economy Crisis Mode
                  <ArrowRight size={19} />
                </button>
                <strong>Bonding curve dashboard</strong>
              </div>
              <span className="preview-status">
                <span className="live-indicator" />
                HEALTHY
              </span>
            </div>

            <div className="preview-metrics">
              <div>
                <span>Pool health</span>
                <strong>98.4%</strong>
                <small>+2.4% this round</small>
              </div>
              <div>
                <span>Curve liquidity</span>
                <strong>1,240</strong>
                <small>Simulation units</small>
              </div>
            </div>

            <div className="preview-allocation">
              <div className="preview-allocation-heading">
                <strong>Resource allocation</strong>
                <span>100 units</span>
              </div>

              <div className="preview-bar">
                <span style={{ width: "35%" }} />
                <span style={{ width: "40%" }} />
                <span style={{ width: "25%" }} />
              </div>

              <div className="preview-legend">
                <span>● Buyback / Stake 35%</span>
                <span>● Curve Liquidity 40%</span>
                <span>● Anti-Snipe 25%</span>
              </div>
            </div>

            <div className="preview-event">
              <div className="preview-event-icon">
                <Activity size={17} />
              </div>
              <div>
                <small>LATEST MARKET EVENT</small>
                <strong>Anti-snipe window active</strong>
              </div>
              <span>PROTECTED</span>
            </div>
          </div>
        </div>

        <section className="how-section">
          <div className="section-heading">
            <span className="eyebrow">YOUR STRATEGY</span>
            <h2>Three levers of an Instant Launch.</h2>
          </div>

          <div className="feature-grid">
            <Feature
              icon={<Lock />}
              title="Staking"
              description="Allocate to buybacks or staker rewards. Protects long-term value after graduation."
              color="green"
            />

            <Feature
              icon={<Waves />}
              title="Bonding Curve Liquidity"
              description="Keep depth high and slippage low so the curve can reach the 85 SOL graduation target."
              color="blue"
            />

            <Feature
              icon={<Zap />}
              title="Anti-Snipe Protection"
              description="Absorb sudden pressure and snipe attacks during the early protection window."
              color="amber"
            />
          </div>
        </section>

        <section className="mission-banner">
          <div>
            <span className="eyebrow">YOUR MISSION</span>
            <h2>Survive five rounds. Graduate the token.</h2>
            <p>
              Balance liquidity, protection and buyback allocation.
              Reach the Instant Launch graduation target.
            </p>
          </div>

          <button onClick={onStart} disabled={loading}>
            {loading ? "Starting..." : "Start Simulation"}
          </button>
        </section>

        <footer className="app-footer">
          <span>POOLKEEPER © 2026</span>
          <span>BUILT TO SHOWCASE LOADOUT INSTANT LAUNCH</span>
          <span>SIMULATION ONLY</span>
        </footer>
      </main>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="feature-card">
      <div className={`feature-icon ${color}`}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}