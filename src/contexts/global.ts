import { createContext } from "react";
import { GAME_STATES, MAX_HEALTH } from "../constants";

export type GlobalContextType = {
  readonly gameState: GAME_STATES;
  setGameState(newState: GAME_STATES): void;
  playerHealth: number;
};

export const GlobalContext = createContext<GlobalContextType>({
  gameState: GAME_STATES.Game,
  setGameState: () => {},
  playerHealth: MAX_HEALTH,
});
