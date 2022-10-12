import { MutableRefObject, useRef, useState } from "react";
import { GlobalContext } from "../../contexts";
import World from "../World";
import Player from "../Player";
import Ui from "../Ui";
import Npc from "../Npc";
import Heart from "../Heart";
import Coin from "../Coin";
import CellarDoor from "../CellarDoor";
import Lever from "../Lever";
import House from "../House";
import Fire from "../Fire";
import GameOver from "../GameOver";
import { EVENTS, GAME_STATES, MAX_HEALTH, MIN_HEALTH } from "../../constants";
import { AnyFunction, Events } from "../../types";
import { Collider } from "../../utils";
import { clampValue } from "../../utils/clampValue";
import "./style.css";

export default function App() {
  const [gameState, setGameState] = useState<GAME_STATES>(GAME_STATES.Game);
  const [colliders, setColliders] = useState<MutableRefObject<Collider>[]>([]);
  const [playerHealth, setPlayerHealth] = useState(MAX_HEALTH);
  const [score, setScore] = useState(0);
  const events = useRef<Events>({});
  const setEvent = (event: EVENTS, cb: AnyFunction) => {
    events.current = {
      ...events.current,
      [event]: [...(events.current[event] || []), cb],
    };
  };
  const callEvent = (event: EVENTS) => {
    events.current[event]?.forEach((cb) => cb());
  };

  return (
    <div className="App">
      <GlobalContext.Provider
        value={{
          gameState,
          setGameState,
          callEvent,
          setEvent,
          playerHealth,
          setPlayerHealth: (health: number) =>
            setPlayerHealth(clampValue(health, MIN_HEALTH, MAX_HEALTH)),
          colliders,
          setColliders,
          score,
          setScore: (value: number) => setScore((oldScore) => oldScore + value),
        }}
      >
        {gameState === GAME_STATES.GameOver && <GameOver />}
        <World />
        <Ui />
        <Player top={332} left={428} />
        <Npc left={1608} top={224} />
        <CellarDoor left={528} top={272} />
        <Lever left={600} top={264} />
        <House left={372} top={192} />
        <Fire left={480} top={524} />
        <Heart left={320} top={828} />
        <Coin left={1152} top={1172} />
      </GlobalContext.Provider>
    </div>
  );
}
