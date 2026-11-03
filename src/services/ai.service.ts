
import type { MarketEvent } from "../game/game.types";
import { getRandomEvent } from "../game/game.events";

// For the MVP, use reliable predefined events.
// This keeps the game playable even without internet access.

export async function generateMarketEvent(
  round: number
): Promise<MarketEvent> {
  // Simulate an event-generation delay.
  await new Promise((resolve) => setTimeout(resolve, 400));

  const event = getRandomEvent(round);

  return {
    ...event,
    id: `${event.id}-${round}-${Date.now()}`,
    severity: Math.min(
      45,
      event.severity + (round - 1) * 2
    ),
  };
}
