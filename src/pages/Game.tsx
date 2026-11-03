
import { ArrowRight, AlertCircle } from "lucide-react";

import GameHeader from "../components/GameHeader";
import PoolHealth from "../components/PoolHealth";
import ResourceAllocation from "../components/ResourceAllocation";
import MarketEvent from "../components/MarketEvent";
import RoundProgress from "../components/RoundProgress";

import { useGameStore } from "../store/game.store";

export default function Game() {
  const game = useGameStore((state) => state.game);
  const isLoadingEvent = useGameStore(
    (state) => state.isLoadingEvent
  );
  const error = useGameStore((state) => state.error);

  const setAllocation = useGameStore(
    (state) => state.setAllocation
  );

  const submitRound = useGameStore(
    (state) => state.submitRound
  );

  const total =
    game.allocation.stake +
    game.allocation.liquidity +
    game.allocation.reserve;

  return (
    <div className="app-shell">
      <GameHeader round={game.round} />

      <main className="game-page">
        <div className="game-intro">
          <div>
            <span className="eyebrow">LIQUIDITY DEFENSE PROTOCOL</span>
            <h1>Command your pool.</h1>
            <p>
              Make your allocations wisely. Every market event
              puts your strategy to the test.
            </p>
          </div>

          <div className="round-indicator">
            <span>MISSION ROUND</span>
            <strong>0{game.round} <small>/ 05</small></strong>
          </div>
        </div>

        <PoolHealth
          health={game.poolHealth}
          liquidity={game.liquidity}
          rewards={game.rewards}
          staked={game.staked}
          graduationSol={game.graduationSol}
        />

        <div className="game-layout">
          <div className="game-main-column">
            <MarketEvent
              event={game.currentEvent}
              loading={isLoadingEvent}
            />

            <ResourceAllocation
              allocation={game.allocation}
              onChange={setAllocation}
              disabled={isLoadingEvent}
            />

            {error && (
              <div className="error-message">
                <AlertCircle size={17} />
                {error}
              </div>
            )}

            <button
              className="primary-button deploy-button"
              onClick={submitRound}
              disabled={
                isLoadingEvent ||
                !game.currentEvent ||
                total !== 100
              }
            >
              {isLoadingEvent
                ? "Preparing next round..."
                : game.round === 5
                  ? "Complete mission"
                  : "Deploy resources"}

              <ArrowRight size={18} />
            </button>

            <p className="deploy-caption">
              Confirm your allocation to resolve this market event.
            </p>
          </div>

          <aside className="game-sidebar">
            <RoundProgress
              currentRound={game.round}
              completedRounds={game.history.length}
            />

            <div className="panel strategy-panel">
              <span className="eyebrow">STRATEGY GUIDE</span>
              <h3>Balance is everything.</h3>

              <div className="guide-item">
                <span className="guide-dot green-dot" />
                <p>
                  <strong>Staking</strong>
                  <br />
                  Earn simulated rewards.
                </p>
              </div>

              <div className="guide-item">
                <span className="guide-dot blue-dot" />
                <p>
                  <strong>Liquidity</strong>
                  <br />
                  Strengthen pool depth.
                </p>
              </div>

              <div className="guide-item">
                <span className="guide-dot amber-dot" />
                <p>
                  <strong>Reserve</strong>
                  <br />
                  Reduce market damage.
                </p>
              </div>
            </div>

            <div className="simulation-warning">
              <AlertCircle size={16} />
              <p>
                This is a game simulation. No real funds
                or LOAD tokens are being moved.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
