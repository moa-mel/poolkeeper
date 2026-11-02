
import {
  AlertTriangle,
  TrendingDown,
  ArrowLeftRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

import type { MarketEvent as Event } from "../game/game.types";

interface Props {
  event: Event | null;
  loading?: boolean;
}

const icons = {
  volatility: TrendingDown,
  withdrawal: ArrowLeftRight,
  trade: AlertTriangle,
  attack: ShieldAlert,
};

export default function MarketEvent({
  event,
  loading,
}: Props) {
  if (loading) {
    return (
      <section className="panel event-panel loading-event">
        <Sparkles size={22} />
        <h3>Generating market scenario...</h3>
        <p>Your next challenge is being prepared.</p>
        <div className="loading-line" />
      </section>
    );
  }

  if (!event) return null;

  const Icon = icons[event.type];

  const severity =
    event.severity >= 30
      ? "HIGH"
      : event.severity >= 20
        ? "MEDIUM"
        : "LOW";

  return (
    <section className="panel event-panel">
      <div className="event-top">
        <span className="eyebrow">MARKET INTELLIGENCE</span>
        <span className={`severity ${severity.toLowerCase()}`}>
          <span /> {severity} SEVERITY
        </span>
      </div>

      <div className="event-content">
        <div className="event-icon">
          <Icon size={25} />
        </div>

        <div>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
        </div>
      </div>

      <div className="recommendation">
        <Sparkles size={16} />
        <div>
          <strong>Strategic insight</strong>
          <p>{event.recommendation}</p>
        </div>
      </div>

      <div className="event-severity-track">
        <span>MARKET PRESSURE</span>
        <div>
          <div
            style={{
              width: `${Math.min(event.severity, 100)}%`,
            }}
          />
        </div>
        <strong>{event.severity}/100</strong>
      </div>
    </section>
  );
}
