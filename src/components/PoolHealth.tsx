
import { Activity, Coins, Waves } from "lucide-react";

interface Props {
  health: number;
  liquidity: number;
  rewards: number;
  staked: number;
}

export default function PoolHealth({
  health,
  liquidity,
  rewards,
  staked,
}: Props) {
  const safeHealth = Math.max(0, Math.min(100, health));

  return (
    <section className="stats-grid">
      <div className="stat-card health-card">
        <div className="stat-heading">
          <span>POOL HEALTH</span>
          <Activity size={17} />
        </div>

        <div className="health-value">
          {safeHealth}<small>%</small>
        </div>

        <div className="health-track">
          <div
            className="health-fill"
            style={{ width: `${safeHealth}%` }}
          />
        </div>

        <span className="stat-caption">
          {safeHealth > 70
            ? "Pool is healthy"
            : safeHealth > 35
              ? "Pool needs attention"
              : "Critical pool condition"}
        </span>
      </div>

      <div className="stat-card">
        <div className="stat-heading">
          <span>LIQUIDITY DEPTH</span>
          <Waves size={17} />
        </div>
        <div className="stat-value">
          {liquidity.toFixed(1)}
        </div>
        <span className="stat-caption">Simulation units</span>
      </div>

      <div className="stat-card">
        <div className="stat-heading">
          <span>TOTAL STAKED</span>
          <Coins size={17} />
        </div>
        <div className="stat-value">
          {staked.toFixed(0)}
        </div>
        <span className="stat-caption">Simulation units</span>
      </div>

      <div className="stat-card">
        <div className="stat-heading">
          <span>STAKING REWARDS</span>
          <Coins size={17} />
        </div>
        <div className="stat-value reward-value">
          +{rewards.toFixed(2)}
        </div>
        <span className="stat-caption">Simulated rewards</span>
      </div>
    </section>
  );
}
