import { useEffect, FunctionComponent } from "react";
import { TILE_SIZE, TILE_SETS } from "../../constants";
import "./style.css";

const WIDTH = TILE_SIZE;
const HEIGHT = TILE_SIZE;
const TILE_X = 130;
const TILE_Y = 98;
const ANIMATION_LENGTH = 6;

/*
 * TODO:
 * - useRef instead of getElementById
 * - util function for tile set, tiles and animation
 * - create global constants for tile sets and tile size
 * - prefer to return early, flip the if condition
 * - clear interval on component destroy
 */
const Fire: FunctionComponent<{ left: number; top: number }> = ({
  left,
  top,
}) => {
  useEffect(() => {
    const canvas = document.getElementById(
      "fire-canvas"
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
          } else if (currentFrame === 4) {
            ctx.drawImage(
              tileSet,
              TILE_X + WIDTH * 4,
              TILE_Y,
              WIDTH,
              HEIGHT,
              0,
              0,
              WIDTH,
              HEIGHT
            );
          } else if (currentFrame === 5) {
            ctx.drawImage(
              tileSet,
              TILE_X + WIDTH * 5,
              TILE_Y,
              WIDTH,
              HEIGHT,
              0,
              0,
              WIDTH,
              HEIGHT
            );
          } else if (currentFrame === 6) {
            ctx.drawImage(
              tileSet,
              TILE_X + WIDTH * 6,
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
        }, 125);
      };
    }
  }, [left, top]);

  return <canvas id="fire-canvas" width={WIDTH} height={HEIGHT}></canvas>;
};

export default Fire;
