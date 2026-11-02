
import { Check, Circle } from "lucide-react";

interface Props {
  currentRound: number;
  completedRounds: number;
}

export default function RoundProgress({
  currentRound,
  completedRounds,
}: Props) {
  return (
    <section className="panel progress-panel">
      <div className="panel-title">
        <div>
          <span className="eyebrow">MISSION PROGRESS</span>
          <h2>Survival rounds</h2>
        </div>

        <span className="progress-count">
          {completedRounds}/5 COMPLETE
        </span>
      </div>

      <div className="round-list">
        {[1, 2, 3, 4, 5].map((round) => {
          const completed = round <= completedRounds;
          const active = round === currentRound;

          return (
            <div
              key={round}
              className={`round-step ${
                completed ? "completed" : ""
              } ${active ? "active" : ""}`}
            >
              <div className="round-circle">
                {completed ? (
                  <Check size={16} />
                ) : (
                  <Circle size={16} />
                )}
              </div>

              <span>ROUND {round}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
