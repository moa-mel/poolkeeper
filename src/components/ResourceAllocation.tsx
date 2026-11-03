
import { Lock, Waves, Shield, Zap } from "lucide-react";
import type { Allocation } from "../game/game.types";

interface Props {
  allocation: Allocation;
  onChange: (allocation: Allocation) => void;
  disabled?: boolean;
}

type AllocationKey = keyof Allocation;

export default function ResourceAllocation({
  allocation,
  onChange,
  disabled = false,
}: Props) {
  const update = (key: AllocationKey, value: number) => {
    const safeValue = Math.max(0, Math.min(100, value));

    const remaining = 100 - safeValue;

    const otherKeys = (
      ["stake", "liquidity", "reserve"] as AllocationKey[]
    ).filter((item) => item !== key);

    const otherTotal = otherKeys.reduce(
      (sum, item) => sum + allocation[item],
      0
    );

    let next: Allocation;

    if (otherTotal === 0) {
      // Split remaining units equally if the other allocations are zero.
      next = {
        ...allocation,
        [key]: safeValue,
        [otherKeys[0]]: Math.floor(remaining / 2),
        [otherKeys[1]]: remaining - Math.floor(remaining / 2),
      };
    } else {
      // Redistribute remaining units proportionally.
      const firstValue = Math.round(
        (allocation[otherKeys[0]] / otherTotal) * remaining
      );

      next = {
        ...allocation,
        [key]: safeValue,
        [otherKeys[0]]: firstValue,
        [otherKeys[1]]: remaining - firstValue,
      };
    }

    onChange(next);
  };

  const total =
    allocation.stake + allocation.liquidity + allocation.reserve;

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
          icon={<Lock size={19} />}
          color="green"
          onChange={(value) => update("stake", value)}
          disabled={disabled}
        />

        <AllocationSlider
          title="Liquidity"
          description="Strengthen the pool and reduce slippage."
          value={allocation.liquidity}
          icon={<Waves size={19} />}
          color="blue"
          onChange={(value) => update("liquidity", value)}
          disabled={disabled}
        />

        <AllocationSlider
          title="Reserve"
          description="Protect against market events."
          value={allocation.reserve}
          icon={<Shield size={19} />}
          color="amber"
          onChange={(value) => update("reserve", value)}
          disabled={disabled}
        />
      </div>

      <div className="allocation-total">
        <span>Total allocated</span>
        <strong>{total}/100</strong>
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
        {value}
        <small>units</small>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={value}
        disabled={disabled}
        className={`resource-slider ${color}`}
        onChange={(event) => onChange(Number(event.target.value))}
      />

      <div className="slider-labels">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  );
}
