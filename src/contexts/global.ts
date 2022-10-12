import { createContext, MutableRefObject } from "react";
import { GAME_STATES, MAX_HEALTH } from "../constants";
import { Collider, noop } from "../utils";

export type GlobalContextType = {
  readonly gameState: GAME_STATES;
  setGameState: (newState: GAME_STATES) => void;
  readonly playerHealth: number;
  setPlayerHealth: (health: number) => void;
  readonly colliders: MutableRefObject<Collider>[];
  setColliders: (
    value: (
      prevValue: MutableRefObject<Collider>[]
    ) => MutableRefObject<Collider>[]
  ) => void;
  readonly score: number;
  setScore: (value: number) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  gameState: GAME_STATES.Game,
  setGameState: noop,
  playerHealth: MAX_HEALTH,
  setPlayerHealth: noop,
  colliders: [],
  setColliders: noop,
  score: 0,
  setScore: noop,
});
