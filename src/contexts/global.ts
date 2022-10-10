import { createContext } from "react";
import { GAME_STATES } from "../constants";

export type GlobalContextType = {
  readonly gameState: GAME_STATES;
  setGameState(newState: GAME_STATES): void;
};

export const GlobalContext = createContext<GlobalContextType>({
  gameState: GAME_STATES.Game,
  setGameState: () => {},
});
