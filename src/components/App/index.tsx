import { MutableRefObject, useState } from "react";
import { GlobalContext } from "../../contexts";
import World from "../World";
import Player from "../Player";
import PlayerHealth from "../PlayerHealth";
import Npc from "../Npc";
import Heart from "../Heart";
import Coin from "../Coin";
import CellarDoor from "../CellarDoor";
import Lever from "../Lever";
import House from "../House";
import Fire from "../Fire";
import GameOver from "../GameOver";
import { GAME_STATES, MAX_HEALTH } from "../../constants";
import { Collider } from "../../utils";
import "./style.css";

/*
 * TODO:
 * - Move component actions and state inside components
 * - Use context to connect components
 */
export default function App() {
  const [gameState, setGameState] = useState<GAME_STATES>(GAME_STATES.Game);
  const [colliders, setColliders] = useState<MutableRefObject<Collider>[]>([]);
  const [isCellarDoorOpen, setIsCellarDoorOpen] = useState(false);
  const [isLeverUsed, setIsLeverUsed] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(MAX_HEALTH);

  return (
    <div className="App">
      <GlobalContext.Provider
        value={{
          gameState,
          setGameState,
          playerHealth,
          setPlayerHealth,
          colliders,
          setColliders,
        }}
      >
        {gameState === GAME_STATES.GameOver && <GameOver />}
        <World />
        <PlayerHealth />
        <Player top={328} left={420} onInteract={setIsLeverUsed} />
        <Npc left={1608} top={224} />
        <CellarDoor isOpen={isCellarDoorOpen} left={528} top={272} />
        <Lever
          left={600}
          top={264}
          used={isLeverUsed}
          onInteract={setIsCellarDoorOpen}
        />
        <House left={372} top={192} />
        <Fire left={480} top={524} />
        <Heart left={320} top={828} />
        <Coin left={1152} top={1172} />
      </GlobalContext.Provider>
    </div>
  );
}
