import { useState } from "react";
import World from "./components/World";
import Player from "./components/Player";
import Heart from "./components/Heart";
import Coin from "./components/Coin";
import CellarDoor from "./components/CellarDoor";
import Lever from "./components/Lever";
import House from "./components/House";
import Fire from "./components/Fire";
import GameOver from "./components/GameOver";
import "./App.css";

/*
 * TODO:
 * - Move component actions and state inside components
 * - Use context to connect components
 */
export default function App() {
  const [isCellarDoorOpen, setIsCellarDoorOpen] = useState(false);
  const [isLeverUsed, setIsLeverUsed] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(4);

  return (
    <div className="App">
      {playerHealth <= 0 && <GameOver />}
      <World />
      <Player
        health={playerHealth}
        onInteract={setIsLeverUsed}
        onCollision={setPlayerHealth}
      />
      <CellarDoor isOpen={isCellarDoorOpen} />
      <Lever
        left={108}
        top={80}
        used={isLeverUsed}
        onInteract={setIsCellarDoorOpen}
      />
      <House />
      <Fire left={32} top={82} />
      <Heart left={64} top={146} />
      <Coin left={80} top={82} />
    </div>
  );
}
