import { createContext, MutableRefObject } from "react";
import { EVENTS, GAME_STATES, MAX_HEALTH } from "../constants";
import { AnyFunction } from "../types";
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
  callEvent: (event: EVENTS) => void;
  setEvent: (event: EVENTS, cb: AnyFunction) => void;
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
  setEvent: noop,
  callEvent: noop,
});
