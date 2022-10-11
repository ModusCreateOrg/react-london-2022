import { useRef, FC } from "react";
import { TILE_SIZE, TILE_SETS } from "../../constants";
import { useAnimatedSprite } from "../../hooks";
import "./style.css";

const WIDTH = TILE_SIZE;
const HEIGHT = TILE_SIZE;

type FireProps = { left: number; top: number };

const Fire: FC<FireProps> = ({ left, top }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useAnimatedSprite({
    canvasRef,
    left,
    top,
    tileSet: TILE_SETS.Objects,
    width: WIDTH,
    height: HEIGHT,
    tileX: 130,
    tileY: 98,
    animationLength: 6,
    animationSpeed: 125,
  });

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
