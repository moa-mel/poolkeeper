
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
import { generateMarketEvent } from "../services/ai.service";

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
    set({
      game: {
        ...INITIAL_STATE,
        status: "playing",
        allocation: { ...INITIAL_ALLOCATION },
        history: [],
      },
      isLoadingEvent: true,
      error: null,
    });

    try {
      const event = await generateMarketEvent(1);

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
    const { game } = get();

    if (
      game.status !== "playing" ||
      !game.currentEvent ||
      get().isLoadingEvent
    ) {
      return;
    }

    try {
      const nextState = processRound(
        game,
        game.allocation,
        game.currentEvent
      );

      set({
        game: nextState,
        error: null,
      });

      if (nextState.status !== "playing") return;

      set({ isLoadingEvent: true });

      const nextEvent = await generateMarketEvent(
        nextState.round
      );

      set((state) => ({
        game: {
          ...state.game,
          currentEvent: nextEvent,
        },
        isLoadingEvent: false,
      }));
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
