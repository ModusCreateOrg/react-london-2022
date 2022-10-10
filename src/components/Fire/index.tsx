import { useEffect, useRef, FC } from "react";
import { TILE_SIZE, TILE_SETS } from "../../constants";
import "./style.css";

const WIDTH = TILE_SIZE;
const HEIGHT = TILE_SIZE;
const TILE_X = 130;
const TILE_Y = 98;
const ANIMATION_LENGTH = 6;

type FireProps = { left: number; top: number };

/*
 * TODO:
 * - util function for tile set, tiles and animation
 */
const Fire: FC<FireProps> = ({ left, top }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    let intervalId: number;

    if (!canvasRef.current || !ctx) {
      return;
    }

    canvasRef.current.style.left = `${left}px`;
    canvasRef.current.style.top = `${top}px`;

    const tileSet = new Image();
    tileSet.src = TILE_SETS.Objects;
    tileSet.onload = () => {
      let currentFrame = 0;

      intervalId = window.setInterval(() => {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        ctx.drawImage(
          tileSet,
          TILE_X + WIDTH * currentFrame,
          TILE_Y,
          WIDTH,
          HEIGHT,
          0,
          0,
          WIDTH,
          HEIGHT
        );

        currentFrame = currentFrame === ANIMATION_LENGTH ? 0 : currentFrame + 1;
      }, 125);
    };

    return () => {
      clearInterval(intervalId);
    };
  }, [left, top]);

  return (
    <canvas
      ref={canvasRef}
      id="fire-canvas"
      width={WIDTH}
      height={HEIGHT}
    ></canvas>
  );
};

export default Fire;
