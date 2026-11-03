
import { create } from "zustand";

import type {
  Allocation,
  GameState,
} from "../game/game.types";

import {
  INITIAL_STATE,
  INITIAL_ALLOCATION,
} from "../game/game.constants";

import { processRound } from "../game/game.engine";
import { getRandomEvent } from "../game/game.events";

interface GameStore {
  game: GameState;
  isLoadingEvent: boolean;
  error: string | null;

  startGame: () => Promise<void>;
  setAllocation: (allocation: Allocation) => void;
  submitRound: () => Promise<void>;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  game: INITIAL_STATE,
  isLoadingEvent: false,
  error: null,

  startGame: async () => {
    const initialGame: GameState = {
      ...INITIAL_STATE,
      status: "playing",
      allocation: { ...INITIAL_ALLOCATION },
      history: [],
    };

    set({
      game: initialGame,
      isLoadingEvent: true,
      error: null,
    });

    try {
      const event = getRandomEvent(
        initialGame.round,
        initialGame.history
      );

      set((state) => ({
        game: {
          ...state.game,
          currentEvent: event,
        },
        isLoadingEvent: false,
      }));
    } catch {
      set({
        isLoadingEvent: false,
        error: "Could not load market event. Please try again.",
      });
    }
  },

  setAllocation: (allocation) => {
    set((state) => ({
      game: {
        ...state.game,
        allocation,
      },
    }));
  },

  submitRound: async () => {
    const { game, isLoadingEvent } = get();

    if (
      game.status !== "playing" ||
      !game.currentEvent ||
      isLoadingEvent
    ) {
      return;
    }

    try {
      // Process the current round.
      const nextState = processRound(
        game,
        game.allocation,
        game.currentEvent
      );

      // No more events are needed after winning or losing.
      if (nextState.status !== "playing") {
        set({
          game: nextState,
          error: null,
          isLoadingEvent: false,
        });

        return;
      }

      // Generate the next event using the complete game history.
      set({ isLoadingEvent: true });

      const nextEvent = getRandomEvent(
        nextState.round,
        nextState.history
      );

      set({
        game: {
          ...nextState,
          currentEvent: nextEvent,
        },
        isLoadingEvent: false,
        error: null,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
        isLoadingEvent: false,
      });
    }
  },

  resetGame: () => {
    set({
      game: INITIAL_STATE,
      isLoadingEvent: false,
      error: null,
    });
  },
}));
