import { useState } from "react";
import { GlobalContext } from "../../contexts";
import World from "../World";
import Player from "../Player";
import Npc from "../Npc";
import Heart from "../Heart";
import Coin from "../Coin";
import CellarDoor from "../CellarDoor";
import Lever from "../Lever";
import House from "../House";
import Fire from "../Fire";
import GameOver from "../GameOver";
import { GAME_STATES } from "../../constants";
import "./style.css";

/*
 * TODO:
 * - Move component actions and state inside components
 * - Use context to connect components
 */
export default function App() {
  const [gameState, setGameState] = useState<GAME_STATES>(GAME_STATES.Game);
  const [isCellarDoorOpen, setIsCellarDoorOpen] = useState(false);
  const [isLeverUsed, setIsLeverUsed] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(4);

  return (
    <div className="App">
      <GlobalContext.Provider value={{ gameState: gameState, setGameState }}>
        {gameState === GAME_STATES.GameOver && <GameOver />}
        <World />
        <Player
          health={playerHealth}
          onInteract={setIsLeverUsed}
          onCollision={setPlayerHealth}
        />
        <Npc left={1608} top={224} />
        <CellarDoor isOpen={isCellarDoorOpen} />
        <Lever
          left={600}
          top={264}
          used={isLeverUsed}
          onInteract={setIsCellarDoorOpen}
        />
        <House />
        <Fire left={480} top={524} />
        <Heart left={320} top={828} />
        <Coin left={1152} top={1172} />
      </GlobalContext.Provider>
    </div>
  );
}
