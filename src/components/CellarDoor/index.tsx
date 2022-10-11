import { useRef, FC } from "react";
import { TILE_SETS } from "../../constants";
import { useSprite } from "../../hooks";
import "./style.css";

const WIDTH = 64;
const HEIGHT = 64;
const TILE_X = 992;

type CellarDoorProps = { top: number; left: number; isOpen?: boolean };

/*
 * TODO:
 * - util function for tile set, tiles and animation
 * - track state internally
 */
const CellarDoor: FC<CellarDoorProps> = ({ isOpen = false, top, left }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useSprite({
    canvasRef,
    left,
    top,
    tileSet: TILE_SETS.World,
    width: WIDTH,
    height: HEIGHT,
    tileX: isOpen ? TILE_X + WIDTH : TILE_X,
    tileY: 160,
  });

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
