import { useEffect, FunctionComponent } from "react";
import "./style.css";

// 496x80

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
      canvas.style.left = "100px";
      canvas.style.top = "100px";

      const tileSet = new Image();
      tileSet.src = "assets/overworld.png";
      tileSet.onload = () => {
        ctx.clearRect(0, 0, 32, 32);

        if (isOpen) {
          ctx.drawImage(tileSet, 528, 80, 32, 32, 0, 0, 32, 32);
        } else {
          ctx.drawImage(tileSet, 496, 80, 32, 32, 0, 0, 32, 32);
        }
      };
    }
  }, [isOpen]);

  return <canvas id="cellar-door-canvas" width="32" height="32"></canvas>;
};

export default CellarDoor;
