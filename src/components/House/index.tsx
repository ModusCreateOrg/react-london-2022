import { useEffect, useRef, FC } from "react";
import { TILE_SETS } from "../../constants";
import "./style.css";

const WIDTH = 148;
const HEIGHT = 160;
const TILE_X = 198;
const TILE_Y = 0;

type HouseProps = { left: number; top: number };

/*
 * TODO:
 * - util function for tile set, tiles and animation
 */
const House: FC<HouseProps> = ({ left, top }) => {
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
    };
  }, [left, top]);

  return (
    <canvas
      ref={canvasRef}
      id="house-canvas"
      width={WIDTH}
      height={HEIGHT}
    ></canvas>
  );
};

export default House;
