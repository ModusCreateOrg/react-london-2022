import { useState } from "react";
import World from "./components/World";
import Player from "./components/Player";
import CellarDoor from "./components/CellarDoor";
import House from "./components/House";
import "./App.css";

/*
 * TODO:
 * - Move component actions and state inside components
 * - Use context to connect components
 */
export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <World />
      <Player openCellarDoor={setIsOpen} />
      <CellarDoor isOpen={isOpen} />
      <House />
    </div>
  );
}
