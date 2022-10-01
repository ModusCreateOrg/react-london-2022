import { useEffect, FunctionComponent } from "react";
import "./style.css";

/*
 * TODO:
 * - useRef instead of getElementById
 * - util function for tile set, tiles and animation
 * - create global constants for tile sets and tile size
 * - prefer to return early, flip the if condition
 * - clear interval on component destroy
 */
const Lever: FunctionComponent<{
  left: number;
  top: number;
  used: boolean;
  onInteract: (value: boolean | ((prev: boolean) => boolean)) => void;
}> = ({ left, top, used, onInteract }) => {
  useEffect(() => {
    const canvas = document.getElementById(
      "lever-canvas"
    ) as HTMLCanvasElement | null;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      canvas.style.left = `${left}px`;
      canvas.style.top = `${top}px`;

      const tileSet = new Image();
      tileSet.src = "assets/objects.png";
      tileSet.onload = () => {
        ctx.clearRect(0, 0, 32, 32);
        onInteract(used);
        if (used) {
          ctx.drawImage(tileSet, 96, 288, 32, 32, 0, 0, 32, 32);
        } else {
          ctx.drawImage(tileSet, 64, 288, 32, 32, 0, 0, 32, 32);
        }
      };
    }
  }, [left, top, used, onInteract]);

  return <canvas id="lever-canvas" width="32" height="32"></canvas>;
};

export default Lever;
