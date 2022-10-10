import { useEffect, FunctionComponent } from "react";
import { TILE_SETS } from "../../constants";
import "./style.css";

const WIDTH = 64;
const HEIGHT = 64;
const TILE_X = 992;
const TILE_Y = 160;

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
      tileSet.src = TILE_SETS.World;
      tileSet.onload = () => {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        if (isOpen) {
          ctx.drawImage(
            tileSet,
            TILE_X + WIDTH,
            TILE_Y,
            WIDTH,
            HEIGHT,
            0,
            0,
            WIDTH,
            HEIGHT
          );
        } else {
          ctx.drawImage(
            tileSet,
            TILE_X,
            TILE_Y,
            WIDTH,
            HEIGHT,
            0,
            0,
            WIDTH,
            HEIGHT
          );
        }
      };
    }
  }, [isOpen]);

  return (
    <canvas id="cellar-door-canvas" width={WIDTH} height={HEIGHT}></canvas>
  );
};

export default CellarDoor;
