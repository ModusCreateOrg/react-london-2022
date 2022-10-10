import { useEffect, useRef, FC } from "react";
import { TILE_SIZE, TILE_SETS } from "../../constants";
import "./style.css";

const WIDTH = TILE_SIZE;
const HEIGHT = TILE_SIZE;
const TILE_X = 64;
const TILE_Y = 288;

type LeverProps = {
  left: number;
  top: number;
  used: boolean;
  onInteract: (value: boolean | ((prev: boolean) => boolean)) => void;
};

/*
 * TODO:
 * - util function for tile set, tiles and animation
 */
const Lever: FC<LeverProps> = ({ left, top, used, onInteract }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (!canvasRef.current || !ctx) {
      return;
    }

    canvasRef.current.style.left = `${left}px`;
    canvasRef.current.style.top = `${top}px`;

    const tileSet = new Image();
    tileSet.src = TILE_SETS.Objects;
    tileSet.onload = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      onInteract(used);

      ctx.drawImage(
        tileSet,
        used ? TILE_X + WIDTH : TILE_X,
        TILE_Y,
        WIDTH,
        HEIGHT,
        0,
        0,
        WIDTH,
        HEIGHT
      );
    };
  }, [left, top, used, onInteract]);

  return (
    <canvas
      ref={canvasRef}
      id="lever-canvas"
      width={WIDTH}
      height={HEIGHT}
    ></canvas>
  );
};

export default Lever;
