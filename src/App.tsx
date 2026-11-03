import { useState } from "react";
import Home from "./pages/Home";
import Game from "./pages/Game";
import CrisisMode from "./pages/CrisisMode";
import GameResults from "./components/GameResults";
import { useGameStore } from "./store/game.store";

export default function App() {
  const [showCrisis, setShowCrisis] = useState(false);

  const game = useGameStore((state) => state.game);
  const startGame = useGameStore((state) => state.startGame);
  const resetGame = useGameStore((state) => state.resetGame);

  if (showCrisis) {
    return <CrisisMode onBack={() => setShowCrisis(false)} />;
  }

  if (game.status === "won" || game.status === "lost") {
    return (
      <GameResults
        game={game}
        onRestart={() => {
          resetGame();
          setShowCrisis(false);
        }}
      />
    );
  }

  if (game.status === "playing") {
    return <Game />;
  }

  return (
    <Home
      onStart={startGame}
      onStartCrisis={() => setShowCrisis(true)}
      loading={false}
    />
  );
}