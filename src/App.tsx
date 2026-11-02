
import Home from "./pages/Home";
import Game from "./pages/Game";
import GameResults from "./components/GameResults";

import { useGameStore } from "./store/game.store";

export default function App() {
  const game = useGameStore((state) => state.game);
  const startGame = useGameStore((state) => state.startGame);
  const resetGame = useGameStore((state) => state.resetGame);

  if (game.status === "won" || game.status === "lost") {
    return (
      <GameResults
        game={game}
        onRestart={resetGame}
      />
    );
  }

  if (game.status === "playing") {
    return <Game />;
  }

  return (
    <Home
      onStart={startGame}
      loading={false}
    />
  );
}
