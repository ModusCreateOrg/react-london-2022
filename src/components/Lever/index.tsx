import { useRef, FC } from "react";
import { TILE_SIZE, TILE_SETS } from "../../constants";
import { useSprite } from "../../hooks";
import "./style.css";

const WIDTH = TILE_SIZE;
const HEIGHT = TILE_SIZE;
const TILE_X = 64;

type LeverProps = {
  left: number;
  top: number;
  used: boolean;
  onInteract: (value: boolean | ((prev: boolean) => boolean)) => void;
};

const Lever: FC<LeverProps> = ({ left, top, used, onInteract }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useSprite({
    canvasRef,
    left,
    top,
    tileSet: TILE_SETS.Objects,
    width: WIDTH,
    height: HEIGHT,
    tileX: used ? TILE_X + WIDTH : TILE_X,
    tileY: 288,
  });

  onInteract(used);

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
