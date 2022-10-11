import { useRef, FC } from "react";
import { TILE_SETS } from "../../constants";
import { useSprite } from "../../hooks";
import "./style.css";

const WIDTH = 148;
const HEIGHT = 160;

type HouseProps = { left: number; top: number };

const House: FC<HouseProps> = ({ left, top }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useSprite({
    canvasRef,
    left,
    top,
    tileSet: TILE_SETS.World,
    width: WIDTH,
    height: HEIGHT,
    tileX: 198,
    tileY: 0,
  });

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
