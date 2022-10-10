import { useEffect, FunctionComponent } from "react";
import { TILE_SIZE, TILE_SETS } from "../../constants";
import "./style.css";

const WIDTH = TILE_SIZE;
const HEIGHT = TILE_SIZE;
const TILE_X = 0;
const TILE_Y = 128;
const ANIMATION_LENGTH = 3;

/*
 * TODO:
 * - useRef instead of getElementById
 * - util function for tile set, tiles and animation
 * - create global constants for tile sets and tile size
 * - prefer to return early, flip the if condition
 * - clear interval on component destroy
 */
const Coin: FunctionComponent<{ left: number; top: number }> = ({
  left,
  top,
}) => {
  useEffect(() => {
    const canvas = document.getElementById(
      "coin-canvas"
    ) as HTMLCanvasElement | null;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      canvas.style.left = `${left}px`;
      canvas.style.top = `${top}px`;

      const tileSet = new Image();
      tileSet.src = TILE_SETS.Objects;
      tileSet.onload = () => {
        let currentFrame = 0;

        setInterval(() => {
          ctx.clearRect(0, 0, WIDTH, HEIGHT);

          if (currentFrame === 0) {
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
          } else if (currentFrame === 1) {
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
          } else if (currentFrame === 2) {
            ctx.drawImage(
              tileSet,
              TILE_X + WIDTH * 2,
              TILE_Y,
              WIDTH,
              HEIGHT,
              0,
              0,
              WIDTH,
              HEIGHT
            );
          } else if (currentFrame === 3) {
            ctx.drawImage(
              tileSet,
              TILE_X + WIDTH * 3,
              TILE_Y,
              WIDTH,
              HEIGHT,
              0,
              0,
              WIDTH,
              HEIGHT
            );
          }

          currentFrame =
            currentFrame === ANIMATION_LENGTH ? 0 : currentFrame + 1;
        }, 100);
      };
    }
  }, [left, top]);

  return <canvas id="coin-canvas" width={WIDTH} height={HEIGHT}></canvas>;
};

export default Coin;
