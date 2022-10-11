import { useRef, FC } from "react";
import { TILE_SIZE, TILE_SETS } from "../../constants";
import { useAnimatedSprite } from "../../hooks";
import "./style.css";

const WIDTH = TILE_SIZE;
const HEIGHT = TILE_SIZE;

type HeartProps = { left: number; top: number };

const Heart: FC<HeartProps> = ({ left, top }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useAnimatedSprite({
    canvasRef,
    left,
    top,
    tileSet: TILE_SETS.Objects,
    width: WIDTH,
    height: HEIGHT,
    tileX: 0,
    tileY: 96,
    animationLength: 3,
    animationSpeed: 75,
  });

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
