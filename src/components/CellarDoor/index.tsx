import { useEffect, useRef, FC } from "react";
import { TILE_SETS } from "../../constants";
import "./style.css";

const WIDTH = 64;
const HEIGHT = 64;
const TILE_X = 992;
const TILE_Y = 160;

type CellarDoorProps = { top: number; left: number; isOpen?: boolean };

/*
 * TODO:
 * - util function for tile set, tiles and animation
 * - track state internally
 */
const CellarDoor: FC<CellarDoorProps> = ({ isOpen = false, top, left }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (!canvasRef.current || !ctx) {
      return;
    }

    canvasRef.current.style.left = `${left}px`;
    canvasRef.current.style.top = `${top}px`;

    const tileSet = new Image();
    tileSet.src = TILE_SETS.World;
    tileSet.onload = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      ctx.drawImage(
        tileSet,
        isOpen ? TILE_X + WIDTH : TILE_X,
        TILE_Y,
        WIDTH,
        HEIGHT,
        0,
        0,
        WIDTH,
        HEIGHT
      );
    };
  }, [isOpen, left, top]);

  return (
    <canvas
      ref={canvasRef}
      id="cellar-door-canvas"
      width={WIDTH}
      height={HEIGHT}
    ></canvas>
  );
};

export default CellarDoor;
