import { useRef, FC, useState } from "react";
import { TILE_SIZE, TILE_SETS } from "../../constants";
import { useAnimatedSprite, useColliders } from "../../hooks";
import {
  Collider,
  ColliderType,
  getRandomPosition,
  Rect,
  Vector,
} from "../../utils";
import "./style.css";

const WIDTH = TILE_SIZE;
const HEIGHT = TILE_SIZE;
const TILE_X = 0;
const TILE_Y = 96;

type HeartProps = { left: number; top: number };

const Heart: FC<HeartProps> = ({ left, top }) => {
  const [position, setPosition] = useState<Vector>(new Vector(left, top));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const updatePosition = (c: Collider) => {
    const newPosition = getRandomPosition(WIDTH, HEIGHT);
    setPosition(newPosition);
    c.rect.moveTo(newPosition.x, newPosition.y);
  };
  const collider = new Collider(
    new Rect(position.x, position.y, WIDTH, HEIGHT),
    ColliderType.Health,
    updatePosition
  );
  const colliderRef = useRef<Collider>(collider);

  useColliders(colliderRef);

  useAnimatedSprite({
    canvasRef,
    left: position.x,
    top: position.y,
    tileSet: TILE_SETS.Objects,
    width: WIDTH,
    height: HEIGHT,
    tileX: TILE_X,
    tileY: TILE_Y,
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
