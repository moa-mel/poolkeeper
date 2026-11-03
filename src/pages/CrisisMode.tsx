import { useState } from "react";
import {
  Activity,
  ArrowRight,
  RotateCcw,
  ShieldAlert,
  Waves,
  Wallet,
} from "lucide-react";

type Crisis = {
  title: string;
  description: string;
  severity: number;
  sellPressure: number;
  liquidityShock: number;
};

type Allocation = {
  liquidity: number;
  reserve: number;
  buyback: number;
};

type CrisisState = {
  round: number;
  health: number;
  liquidity: number;
  treasury: number;
  score: number;
  status: "playing" | "won" | "lost";
  allocation: Allocation;
  currentCrisis: Crisis;
  history: string[];
};

const CRISES: Crisis[] = [
  {
    title: "Whale Sell-Off",
    description:
      "A large holder is selling. Liquidity is draining and slippage is rising.",
    severity: 24,
    sellPressure: 30,
    liquidityShock: 18,
  },
  {
    title: "Liquidity Withdrawal",
    description:
      "Liquidity providers are withdrawing funds. Restore depth before the next shock.",
    severity: 20,
    sellPressure: 18,
    liquidityShock: 25,
  },
  {
    title: "Trading Bot Surge",
    description:
      "Automated traders are increasing market pressure and volatility.",
    severity: 28,
    sellPressure: 38,
    liquidityShock: 12,
  },
  {
    title: "Buyback Demand Spike",
    description:
      "Buyback demand is rising. Support the market without exhausting the treasury.",
    severity: 18,
    sellPressure: 14,
    liquidityShock: 8,
  },
  {
    title: "Market Confidence Shock",
    description:
      "Sentiment has weakened. Protect liquidity and preserve enough treasury runway.",
    severity: 32,
    sellPressure: 34,
    liquidityShock: 20,
  },
];

const INITIAL_ALLOCATION: Allocation = {
  liquidity: 40,
  reserve: 40,
  buyback: 20,
};

const INITIAL_STATE: CrisisState = {
  round: 1,
  health: 100,
  liquidity: 100,
  treasury: 100,
  score: 0,
  status: "playing",
  allocation: INITIAL_ALLOCATION,
  currentCrisis: CRISES[0],
  history: [],
};

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export default function CrisisMode({
  onBack,
}: {
  onBack: () => void;
}) {
  const [game, setGame] = useState<CrisisState>(INITIAL_STATE);

  function updateAllocation(key: keyof Allocation, value: number) {
    const safeValue = clamp(value);
    const remaining = 100 - safeValue;
    const otherKeys = (
      ["liquidity", "reserve", "buyback"] as const
    ).filter((item) => item !== key);

    const otherTotal = otherKeys.reduce(
      (sum, item) => sum + game.allocation[item],
      0,
    );

    const firstValue =
      otherTotal === 0
        ? Math.floor(remaining / 2)
        : Math.round(
            (game.allocation[otherKeys[0]] / otherTotal) *
              remaining,
          );

    setGame((current) => ({
      ...current,
      allocation: {
        ...current.allocation,
        [key]: safeValue,
        [otherKeys[0]]: firstValue,
        [otherKeys[1]]: remaining - firstValue,
      },
    }));
  }

  function resolveCrisis() {
    if (game.status !== "playing") return;

    const { allocation, currentCrisis } = game;

    // Spend allocated treasury units on the chosen response.
    const spent =
      allocation.liquidity * 0.25 +
      allocation.reserve * 0.2 +
      allocation.buyback * 0.3;

    const treasury = clamp(game.treasury - spent);

    const liquidity =
      clamp(
        game.liquidity +
          allocation.liquidity * 0.35 -
          currentCrisis.liquidityShock,
      );

    const protection =
      allocation.reserve * 0.35 +
      allocation.liquidity * 0.12 +
      allocation.buyback * 0.08;

    const pressureDamage =
      currentCrisis.severity +
      currentCrisis.sellPressure / Math.max(liquidity, 1) * 12;

    const damage = Math.max(0, pressureDamage - protection);
    const health = clamp(game.health - damage);

    const roundScore = Math.round(
      health * 2 +
        liquidity * 1.5 +
        treasury +
        Math.max(0, 100 - spent) * 0.5,
    );

    const nextRound = game.round + 1;
    const isLost = health <= 0 || liquidity <= 0 || treasury <= 0;
    const isWon = nextRound > CRISES.length && !isLost;

    const history = [
      ...game.history,
      `${currentCrisis.title}: −${Math.round(damage)} health`,
    ];

    setGame({
      ...game,
      health,
      liquidity,
      treasury,
      score: game.score + roundScore,
      history,
      status: isLost ? "lost" : isWon ? "won" : "playing",
      round: isWon || isLost ? game.round : nextRound,
      currentCrisis: CRISES[Math.min(nextRound - 1, CRISES.length - 1)],
      allocation: INITIAL_ALLOCATION,
    });
  }

  function restart() {
    setGame(INITIAL_STATE);
  }

  const total =
    game.allocation.liquidity +
    game.allocation.reserve +
    game.allocation.buyback;

  if (game.status !== "playing") {
    const won = game.status === "won";

    return (
      <main className="home-page crisis-page">
        <section className="panel crisis-result">
          <span className="eyebrow">CRISIS MODE COMPLETE</span>
          <h1>{won ? "Economy protected." : "Economy collapsed."}</h1>
          <p>
            {won
              ? "You survived all five market shocks."
              : "Your economy ran out of health, liquidity, or treasury."}
          </p>
          <div className="crisis-result-stats">
            <strong>Score: {game.score}</strong>
            <strong>Health: {Math.round(game.health)}%</strong>
            <strong>Liquidity: {Math.round(game.liquidity)}</strong>
            <strong>Treasury: {Math.round(game.treasury)}</strong>
          </div>
          <button className="primary-button" onClick={restart}>
            <RotateCcw size={17} /> Play again
          </button>
          <button className="secondary-button" onClick={onBack}>
            Back to mode selection
          </button>
        </section>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <main className="game-page crisis-page">
        <div className="game-intro">
          <div>
            <span className="eyebrow">POOLKEEPER · GAME ECONOMY</span>
            <h1>Protect the economy.</h1>
            <p>
              Respond to market shocks. Balance liquidity support,
              reserves, and buybacks across five crises.
            </p>
          </div>
          <div className="round-indicator">
            <span>CRISIS ROUND</span>
            <strong>
              0{game.round} <small>/ 05</small>
            </strong>
          </div>
        </div>

        <section className="crisis-metrics">
          <Metric
            icon={<Activity size={18} />}
            label="Economy health"
            value={`${Math.round(game.health)}%`}
          />
          <Metric
            icon={<Waves size={18} />}
            label="Liquidity"
            value={Math.round(game.liquidity).toString()}
          />
          <Metric
            icon={<Wallet size={18} />}
            label="Treasury"
            value={`${Math.round(game.treasury)} units`}
          />
        </section>

        <section className="panel crisis-event">
          <div className="event-top">
            <span className="eyebrow">MARKET SHOCK</span>
            <span className="severity high">
              <span /> SEVERITY {game.currentCrisis.severity}
            </span>
          </div>
          <div className="event-content">
            <div className="event-icon">
              <ShieldAlert size={25} />
            </div>
            <div>
              <h2>{game.currentCrisis.title}</h2>
              <p>{game.currentCrisis.description}</p>
            </div>
          </div>
          <div className="crisis-pressure">
            <span>SELL PRESSURE</span>
            <strong>{game.currentCrisis.sellPressure}</strong>
            <span>LIQUIDITY SHOCK</span>
            <strong>{game.currentCrisis.liquidityShock}</strong>
          </div>
        </section>

        <section className="panel allocation-panel">
          <div className="panel-title">
            <div>
              <span className="eyebrow">RESPONSE STRATEGY</span>
              <h2>Allocate treasury</h2>
              <p>Choose how to respond. Total allocation must equal 100.</p>
            </div>
            <div className="energy-badge">100 UNITS</div>
          </div>

          <CrisisSlider
            label="Liquidity support"
            description="Add depth and reduce market impact."
            value={game.allocation.liquidity}
            onChange={(value) => updateAllocation("liquidity", value)}
          />
          <CrisisSlider
            label="Emergency reserve"
            description="Absorb shock and reduce health damage."
            value={game.allocation.reserve}
            onChange={(value) => updateAllocation("reserve", value)}
          />
          <CrisisSlider
            label="Buyback support"
            description="Support demand while spending treasury."
            value={game.allocation.buyback}
            onChange={(value) => updateAllocation("buyback", value)}
          />

          <div className="allocation-total">
            <span>Total allocated</span>
            <strong>{total}/100</strong>
          </div>

          <button
            className="primary-button deploy-button"
            onClick={resolveCrisis}
            disabled={total !== 100}
          >
            Resolve crisis <ArrowRight size={18} />
          </button>
          <p className="deploy-caption">
            This is a simulated decision. No real funds or tokens move.
          </p>
        </section>

        {game.history.length > 0 && (
          <section className="panel crisis-history">
            <span className="eyebrow">PREVIOUS ROUNDS</span>
            {game.history.map((entry, index) => (
              <p key={`${entry}-${index}`}>{entry}</p>
            ))}
          </section>
        )}

        <button className="secondary-button" onClick={onBack}>
          Back to mode selection
        </button>
      </main>
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="panel crisis-metric">
      <div>{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function CrisisSlider({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="allocation-item crisis-slider">
      <div className="allocation-info">
        <div>
          <strong>{label}</strong>
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
        className="resource-slider"
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className="slider-labels">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  );
}