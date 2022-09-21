import { useState } from "react";
import World from "./components/World";
import Player from "./components/Player";
import Heart from "./components/Heart";
import CellarDoor from "./components/CellarDoor";
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
  const [isOpen, setIsOpen] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(4);

  return (
    <div className="App">
      {playerHealth <= 0 && <GameOver />}
      <World />
      <Player
        health={playerHealth}
        openCellarDoor={setIsOpen}
        onCollision={setPlayerHealth}
      />
      <CellarDoor isOpen={isOpen} />
      <House />
      <Fire left={32} top={82} />
      <Heart left={64} top={146} />
    </div>
  );
}
