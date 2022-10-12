import { useRef, FC } from "react";
import { TILE_SIZE, TILE_SETS } from "../../constants";
import { useAnimatedSprite, useColliders } from "../../hooks";
import { Collider, ColliderType, Rect } from "../../utils";
import "./style.css";

const WIDTH = TILE_SIZE;
const HEIGHT = TILE_SIZE;
const TILE_X = 0;
const TILE_Y = 128;

type CoinProps = { left: number; top: number };

const Coin: FC<CoinProps> = ({ left, top }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const collider = useRef<Collider>(
    new Collider(new Rect(left, top, WIDTH, HEIGHT), ColliderType.Bonus)
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
    animationLength: 3,
    animationSpeed: 100,
  });

  return (
    <canvas
      ref={canvasRef}
      id="coin-canvas"
      width={WIDTH}
      height={HEIGHT}
    ></canvas>
  );
};

export default Coin;
