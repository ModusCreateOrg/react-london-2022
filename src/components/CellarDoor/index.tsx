import { useEffect, FunctionComponent } from "react";
import "./style.css";

/*
 * TODO:
 * - useRef instead of getElementById
 * - util function for tile set, tiles and animation
 * - create global constants for tile sets and tile size
 * - prefer to return early, flip the if condition
 * - track state internally
 */
const CellarDoor: FunctionComponent<{ isOpen?: boolean }> = ({
  isOpen = false,
}) => {
  useEffect(() => {
    const canvas = document.getElementById(
      "cellar-door-canvas"
    ) as HTMLCanvasElement | null;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      canvas.style.left = "528px";
      canvas.style.top = "272px";

      const tileSet = new Image();
      tileSet.src = "assets/overworld.png";
      tileSet.onload = () => {
        ctx.clearRect(0, 0, 64, 64);

        if (isOpen) {
          ctx.drawImage(tileSet, 1056, 160, 64, 64, 0, 0, 64, 64);
        } else {
          ctx.drawImage(tileSet, 992, 160, 64, 64, 0, 0, 64, 64);
        }
      };
    }
  }, [isOpen]);

  return <canvas id="cellar-door-canvas" width="64" height="64"></canvas>;
};

export default CellarDoor;
