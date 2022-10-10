import { useEffect, FunctionComponent } from "react";
import { TILE_SIZE, TILE_SETS } from "../../constants";
import "./style.css";

const WIDTH = TILE_SIZE;
const HEIGHT = TILE_SIZE;
const TILE_X = 64;
const TILE_Y = 288;

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
      tileSet.src = TILE_SETS.Objects;
      tileSet.onload = () => {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        onInteract(used);
        if (used) {
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
  }, [left, top, used, onInteract]);

  return <canvas id="lever-canvas" width={WIDTH} height={HEIGHT}></canvas>;
};

export default Lever;
