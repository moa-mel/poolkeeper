
import { Shield, Zap } from "lucide-react";

interface Props {
  round?: number;
}

export default function GameHeader({ round }: Props) {
  return (
    <header className="game-header">
      <div className="brand">
        <div className="brand-icon">
          <Shield size={21} />
        </div>
        <span>POOL<span className="brand-accent">KEEPER</span></span>
      </div>

      <div className="header-center">
        <span className="live-indicator" />
        SIMULATED LIQUIDITY ARENA
      </div>

      <div className="header-right">
        {round && (
          <span className="round-label">
            <Zap size={15} /> ROUND {round}/5
          </span>
        )}
        <span className="network-label">DEMO NETWORK</span>
      </div>
    </header>
  );
}
