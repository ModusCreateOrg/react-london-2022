import { useRef, FC } from "react";
import { TILE_SIZE, TILE_SETS } from "../../constants";
import { useAnimatedSprite, useColliders } from "../../hooks";
import { Collider, ColliderType, Rect } from "../../utils";
import "./style.css";

const WIDTH = TILE_SIZE;
const HEIGHT = TILE_SIZE;
const TILE_X = 130;
const TILE_Y = 98;

type FireProps = { left: number; top: number };

const Fire: FC<FireProps> = ({ left, top }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const collider = useRef<Collider>(
    new Collider(new Rect(left, top, WIDTH, HEIGHT), ColliderType.Damage)
  );

  useColliders(collider);

  useAnimatedSprite({
    canvasRef,
    left,
    top,
    tileSet: TILE_SETS.Objects,
    width: WIDTH,
    height: HEIGHT,
    tileX: TILE_X,
    tileY: TILE_Y,
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
