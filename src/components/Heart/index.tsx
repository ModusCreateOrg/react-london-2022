import { useEffect, useRef, FC } from "react";
import { TILE_SIZE, TILE_SETS } from "../../constants";
import "./style.css";

const WIDTH = TILE_SIZE;
const HEIGHT = TILE_SIZE;
const TILE_X = 0;
const TILE_Y = 96;
const ANIMATION_LENGTH = 3;

type HeartProps = { left: number; top: number };

/*
 * TODO:
 * - util function for tile set, tiles and animation
 */
const Heart: FC<HeartProps> = ({ left, top }) => {
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
      }, 75);
    };

    return () => {
      clearInterval(intervalId);
    };
  }, [left, top]);

  return (
    <canvas
      ref={canvasRef}
      id="heart-canvas"
      width={WIDTH}
      height={HEIGHT}
    ></canvas>
  );
};

export default Heart;
