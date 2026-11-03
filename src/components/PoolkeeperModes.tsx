
import { useState } from "react";
import {
  Shield,
  RotateCcw,
  Play,
  Trophy,
  AlertTriangle
} from "lucide-react";

type Mode = "launch" | "crisis";

const TOTAL_ROUNDS = 5;

const launchEvents = [
  { title: "Early Buyer Surge", description: "Demand is rising. More liquidity can help absorb volatility.", demand: 12, pressure: 4 },
  { title: "Whale Sell-Off", description: "A large holder is selling. Protect the pool from sudden price impact.", demand: -8, pressure: 18 },
  { title: "Community Growth", description: "New players are buying into the token.", demand: 15, pressure: 3 },
  { title: "Market Uncertainty", description: "Trading slows and volatility increases.", demand: -5, pressure: 12 },
  { title: "Launch Momentum", description: "The community is active. Strong decisions can help graduation.", demand: 20, pressure: 5 },
];

const crisisEvents = [
  { title: "Whale Sell-Off", description: "A large holder is selling. Liquidity is under pressure.", sellPressure: 30, volatility: 22 },
  { title: "Trading Volume Spike", description: "Trading activity surges. Prepare for greater price movement.", sellPressure: 12, volatility: 18 },
  { title: "Liquidity Withdrawal", description: "Liquidity has been removed from the pool.", sellPressure: 20, volatility: 25 },
  { title: "Community Panic", description: "Negative sentiment is increasing sell pressure.", sellPressure: 24, volatility: 20 },
  { title: "Market Recovery", description: "Buyers are returning, but the economy is still fragile.", sellPressure: 8, volatility: 10 },
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function Metric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      {detail && <p className="mt-1 text-xs text-slate-500">{detail}</p>}
    </div>
  );
}

export default function PoolkeeperModes() {
  const [mode, setMode] = useState<Mode>("launch");

  return (
    <main className="min-h-screen bg-[#080d18] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Poolkeeper
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Game Economy Lab
            </h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              Practice launch strategy and respond to simulated market shocks.
            </p>
          </div>

          <div className="flex rounded-xl border border-white/10 bg-white/[0.04] p-1">
            <button
              onClick={() => setMode("launch")}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                mode === "launch" ? "bg-cyan-400 text-slate-950" : "text-slate-300"
              }`}
            >
              Launch Simulator
            </button>
            <button
              onClick={() => setMode("crisis")}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                mode === "crisis" ? "bg-cyan-400 text-slate-950" : "text-slate-300"
              }`}
            >
              Crisis Mode
            </button>
          </div>
        </header>

        {mode === "launch" ? <LaunchSimulator /> : <CrisisMode />}
        <p className="mt-8 text-center text-xs text-slate-600">
          Simulation only. Values are illustrative and do not represent live Loadout market data.
        </p>
      </div>
    </main>
  );
}

function LaunchSimulator() {
  const [round, setRound] = useState(0);
  const [energy, setEnergy] = useState({ liquidity: 40, protection: 30, studio: 30 });
  const [state, setState] = useState({
    liquidity: 100,
    protection: 50,
    treasury: 50,
    progress: 0,
    score: 0,
  });
  const [result, setResult] = useState<string | null>(null);

  const event = launchEvents[round];
  const total = energy.liquidity + energy.protection + energy.studio;
  const valid = total === 100;

  function updateAllocation(key: keyof typeof energy, value: number) {
    setEnergy((current) => ({ ...current, [key]: value }));
  }

  function submitRound() {
    if (!valid || result) return;

    const liquidityGain = energy.liquidity * 0.35;
    const protectionGain = energy.protection * 0.3;
    const treasuryGain = energy.studio * 0.25;

    const liquidity = clamp(
      state.liquidity + liquidityGain + event.demand - event.pressure,
      0,
      200
    );
    const protection = clamp(
      state.protection + protectionGain - event.pressure * 0.2,
      0,
      100
    );
    const treasury = clamp(state.treasury + treasuryGain, 0, 200);
    const progress = clamp(
      state.progress + 12 + energy.liquidity * 0.12 + event.demand * 0.3,
      0,
      100
    );
    const score = state.score + Math.round(
      liquidity * 0.25 + protection * 0.2 + treasury * 0.15 + progress * 0.4
    );

    setState({ liquidity, protection, treasury, progress, score });

    if (round === TOTAL_ROUNDS - 1) {
      setResult(
        progress >= 70 && liquidity >= 40
          ? "Launch graduated! You balanced growth, liquidity, and protection."
          : "Launch failed to graduate. Review your allocations and try again."
      );
    } else {
      setRound((current) => current + 1);
    }
  }

  function reset() {
    setRound(0);
    setEnergy({ liquidity: 40, protection: 30, studio: 30 });
    setState({ liquidity: 100, protection: 50, treasury: 50, progress: 0, score: 0 });
    setResult(null);
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Launch progression</p>
          <h2 className="text-xl font-semibold">Round {result ? TOTAL_ROUNDS : round + 1} of {TOTAL_ROUNDS}</h2>
        </div>
        <button onClick={reset} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5">
          <RotateCcw size={16} /> Restart
        </button>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-cyan-400 transition-all" style={{ width: `${((round + (result ? 1 : 0)) / TOTAL_ROUNDS) * 100}%` }} />
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Metric label="Liquidity" value={`${Math.round(state.liquidity)} SOL`} />
        <Metric label="Protection" value={`${Math.round(state.protection)}%`} />
        <Metric label="Studio treasury" value={`${Math.round(state.treasury)} SOL`} />
        <Metric label="Launch progress" value={`${Math.round(state.progress)}%`} />
      </div>

      {!result ? (
        <>
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
            <div className="flex items-center gap-2 text-amber-300">
              <AlertTriangle size={18} />
              <h3 className="font-semibold">{event.title}</h3>
            </div>
            <p className="mt-2 text-sm text-slate-300">{event.description}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <AllocationSlider label="Bonding curve liquidity" value={energy.liquidity} onChange={(v) => updateAllocation("liquidity", v)} />
              <AllocationSlider label="Anti-snipe protection" value={energy.protection} onChange={(v) => updateAllocation("protection", v)} />
              <AllocationSlider label="Studio treasury" value={energy.studio} onChange={(v) => updateAllocation("studio", v)} />
              <div className={`text-sm ${valid ? "text-emerald-400" : "text-rose-400"}`}>
                Allocation total: {total}% {valid ? "✓" : "(must equal 100%)"}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-semibold">Round decision</h3>
              <p className="mt-2 text-sm text-slate-400">
                Allocate 100% of your strategy budget, then submit to resolve the market event.
              </p>
              <button disabled={!valid} onClick={submitRound} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40">
                <Play size={16} /> Submit allocation
              </button>
            </div>
          </div>
        </>
      ) : (
        <ResultPanel message={result} score={state.score} onRestart={reset} />
      )}
    </section>
  );
}

function CrisisMode() {
  const [round, setRound] = useState(0);
  const [budget, setBudget] = useState({ liquidity: 12, reserve: 10, buyback: 8 });
  const [state, setState] = useState({ liquidity: 100, treasury: 60, health: 80, score: 0 });
  const [result, setResult] = useState<string | null>(null);

  const event = crisisEvents[round];
  const total = budget.liquidity + budget.reserve + budget.buyback;
  const valid = total <= state.treasury;

  function updateBudget(key: keyof typeof budget, value: number) {
    setBudget((current) => ({ ...current, [key]: value }));
  }

  function executeStrategy() {
    if (!valid || result) return;

    const liquidity = clamp(
      state.liquidity + budget.liquidity * 1.4 - event.sellPressure * 0.8,
      0,
      200
    );
    const treasury = clamp(state.treasury - total + budget.reserve * 0.15, 0, 200);
    const health = clamp(
      state.health +
        budget.liquidity * 0.35 +
        budget.buyback * 0.2 +
        budget.reserve * 0.15 -
        event.sellPressure * 0.7 -
        event.volatility * 0.25,
      0,
      100
    );
    const score = state.score + Math.max(0, Math.round(health - event.volatility * 0.2));

    setState({ liquidity, treasury, health, score });

    if (round === crisisEvents.length - 1) {
      setResult(
        health >= 45 && liquidity >= 25
          ? "Economy stabilized! You survived all five market shocks."
          : "The economy collapsed. Preserve more liquidity and reserves next run."
      );
    } else {
      setRound((current) => current + 1);
      setBudget({ liquidity: 12, reserve: 10, buyback: 8 });
    }
  }

  function reset() {
    setRound(0);
    setBudget({ liquidity: 12, reserve: 10, buyback: 8 });
    setState({ liquidity: 100, treasury: 60, health: 80, score: 0 });
    setResult(null);
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Market crisis response</p>
          <h2 className="text-xl font-semibold">Crisis {result ? crisisEvents.length : round + 1} of {crisisEvents.length}</h2>
        </div>
        <button onClick={reset} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5">
          <RotateCcw size={16} /> Restart
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Pool liquidity" value={`${Math.round(state.liquidity)} SOL`} detail="Simulated pool depth" />
        <Metric label="Studio treasury" value={`${Math.round(state.treasury)} SOL`} detail="Available response budget" />
        <Metric label="Economy health" value={`${Math.round(state.health)} / 100`} detail="Composite game score" />
      </div>

      {!result ? (
        <>
          <div className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.06] p-5">
            <div className="flex items-center gap-2 text-rose-300">
              <AlertTriangle size={18} />
              <h3 className="font-semibold">{event.title}</h3>
            </div>
            <p className="mt-2 text-sm text-slate-300">{event.description}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              <span className="rounded-full bg-rose-400/10 px-3 py-1 text-rose-200">Sell pressure: {event.sellPressure}%</span>
              <span className="rounded-full bg-amber-400/10 px-3 py-1 text-amber-200">Volatility: {event.volatility}</span>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <AllocationSlider label="Add liquidity" value={budget.liquidity} max={state.treasury} onChange={(v) => updateBudget("liquidity", v)} unit="SOL" />
              <AllocationSlider label="Keep in reserve" value={budget.reserve} max={state.treasury} onChange={(v) => updateBudget("reserve", v)} unit="SOL" />
              <AllocationSlider label="Buyback budget" value={budget.buyback} max={state.treasury} onChange={(v) => updateBudget("buyback", v)} unit="SOL" />
              <p className={`text-sm ${valid ? "text-emerald-400" : "text-rose-400"}`}>
                Allocated: {total} / {state.treasury} SOL {valid ? "✓" : "(over budget)"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-semibold">Response strategy</h3>
              <p className="mt-2 text-sm text-slate-400">
                Deploy treasury funds to absorb selling, retain reserves, and support market confidence.
              </p>
              <button disabled={!valid} onClick={executeStrategy} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40">
                <Shield size={16} /> Execute strategy
              </button>
            </div>
          </div>
        </>
      ) : (
        <ResultPanel message={result} score={state.score} onRestart={reset} />
      )}
    </section>
  );
}

function AllocationSlider({
  label,
  value,
  onChange,
  max = 100,
  unit = "%",
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  unit?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between gap-4 text-sm">
        <label className="text-slate-300">{label}</label>
        <span className="font-semibold text-white">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-cyan-400"
      />
    </div>
  );
}

function ResultPanel({
  message,
  score,
  onRestart,
}: {
  message: string;
  score: number;
  onRestart: () => void;
}) {
  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.05] p-8 text-center">
      <Trophy className="mx-auto text-cyan-300" size={36} />
      <h3 className="mt-4 text-2xl font-bold">{message}</h3>
      <p className="mt-3 text-slate-300">Final score: {score}</p>
      <button onClick={onRestart} className="mt-6 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950">
        Play again
      </button>
    </div>
  );
}
