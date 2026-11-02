
import { Lock, Waves, Shield, Zap } from "lucide-react";
import type { Allocation } from "../game/game.types";

interface Props {
  allocation: Allocation;
  onChange: (allocation: Allocation) => void;
  disabled?: boolean;
}

export default function ResourceAllocation({
  allocation,
  onChange,
  disabled = false,
}: Props) {
  const update = (
    key: "stake" | "liquidity",
    value: number
  ) => {
    const safeValue = Math.max(0, Math.min(100, value));

    const otherKey =
      key === "stake" ? "liquidity" : "stake";

    const otherValue = Math.min(
      allocation[otherKey],
      100 - safeValue
    );

    const next = {
      ...allocation,
      [key]: safeValue,
      [otherKey]: otherValue,
    };

    next.reserve = 100 - next.stake - next.liquidity;

    onChange(next);
  };

  return (
    <section className="panel allocation-panel">
      <div className="panel-title">
        <div>
          <span className="eyebrow">STRATEGY CONTROL</span>
          <h2>Allocate resources</h2>
          <p>Decide how to protect and grow your pool.</p>
        </div>

        <div className="energy-badge">
          <Zap size={16} />
          100 ENERGY
        </div>
      </div>

      <div className="allocation-items">
        <AllocationSlider
          title="Stake"
          description="Lock energy to accumulate rewards."
          value={allocation.stake}
          icon={<Lock />}
          color="green"
          onChange={(value) => update("stake", value)}
          disabled={disabled}
        />

        <AllocationSlider
          title="Liquidity"
          description="Strengthen the pool and reduce slippage."
          value={allocation.liquidity}
          icon={<Waves />}
          color="blue"
          onChange={(value) => update("liquidity", value)}
          disabled={disabled}
        />

        <div className="allocation-item reserve-item">
          <div className="allocation-info">
            <div className="allocation-icon amber">
              <Shield size={19} />
            </div>
            <div>
              <strong>Reserve</strong>
              <p>Protect against market events.</p>
            </div>
          </div>

          <div className="allocation-number">
            {allocation.reserve}
            <small>units</small>
          </div>

          <div className="allocation-track">
            <div
              className="allocation-fill amber-fill"
              style={{ width: `${allocation.reserve}%` }}
            />
          </div>
        </div>
      </div>

      <div className="allocation-total">
        <span>Total allocated</span>
        <strong>
          {allocation.stake +
            allocation.liquidity +
            allocation.reserve}
          /100
        </strong>
      </div>
    </section>
  );
}

interface SliderProps {
  title: string;
  description: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  onChange: (value: number) => void;
  disabled?: boolean;
}

function AllocationSlider({
  title,
  description,
  value,
  icon,
  color,
  onChange,
  disabled,
}: SliderProps) {
  return (
    <div className="allocation-item">
      <div className="allocation-info">
        <div className={`allocation-icon ${color}`}>
          {icon}
        </div>
        <div>
          <strong>{title}</strong>
          <p>{description}</p>
        </div>
      </div>

      <div className="allocation-number">
        {value}<small>units</small>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={value}
        disabled={disabled}
        className={`resource-slider ${color}`}
        onChange={(event) =>
          onChange(Number(event.target.value))
        }
      />

      <div className="slider-labels">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  );
}
