
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
  loading: boolean;
}

export default function Home({ onStart, loading }: Props) {
  return (
    <div className="app-shell">
      <GameHeader />

      <main className="home-page">
        <div className="hero-section">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="live-indicator" />
              STRATEGIC LIQUIDITY SIMULATOR
            </div>

            <h1>
              DEFEND YOUR
              <br />
              <span>LIQUIDITY.</span>
              <br />
              OWN THE MARKET.
            </h1>

            <p>
              Every decision matters. Stake your resources,
              strengthen your liquidity and survive five
              unpredictable market events.
            </p>

            <button
              className="primary-button hero-button"
              onClick={onStart}
              disabled={loading}
            >
              {loading ? "Preparing mission..." : "Start Mission"}
              <ArrowRight size={19} />
            </button>

            <div className="hero-footnote">
              <Shield size={15} />
              No wallet required · Free simulation
            </div>
          </div>

          
<div className="hero-visual product-preview">
  <div className="preview-header">
    <div>
      <span>POOL OVERVIEW</span>
      <strong>Liquidity dashboard</strong>
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
      <span>Liquidity depth</span>
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
      <span style={{ width: "40%" }} />
      <span style={{ width: "40%" }} />
      <span style={{ width: "20%" }} />
    </div>

    <div className="preview-legend">
      <span>● Stake 40%</span>
      <span>● Liquidity 40%</span>
      <span>● Reserve 20%</span>
    </div>
  </div>

  <div className="preview-event">
    <div className="preview-event-icon">
      <Activity size={17} />
    </div>
    <div>
      <small>LATEST MARKET EVENT</small>
      <strong>Market conditions stable</strong>
    </div>
    <span>LOW RISK</span>
  </div>
</div>

        </div>

        <section className="how-section">
          <div className="section-heading">
            <span className="eyebrow">YOUR STRATEGY</span>
            <h2>Three ways to survive.</h2>
          </div>

          <div className="feature-grid">
            <Feature
              icon={<Lock />}
              title="Stake"
              description="Allocate resources to staking and accumulate simulated rewards."
              color="green"
            />

            <Feature
              icon={<Waves />}
              title="Provide liquidity"
              description="Strengthen pool depth and reduce the impact of market pressure."
              color="blue"
            />

            <Feature
              icon={<Zap />}
              title="Keep reserves"
              description="Protect your pool when unexpected market events strike."
              color="amber"
            />
          </div>
        </section>

        <section className="mission-banner">
          <div>
            <span className="eyebrow">YOUR MISSION</span>
            <h2>Survive five rounds. Protect the pool.</h2>
            <p>
              Balance growth, liquidity and protection.
              There is no perfect strategy.
            </p>
          </div>

          <button onClick={onStart} disabled={loading}>
            Enter the arena <ArrowRight size={17} />
          </button>
        </section>

        <footer className="app-footer">
          <span>POOLKEEPER © 2026</span>
          <span>INSPIRED BY THE LOADOUT ECOSYSTEM</span>
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
