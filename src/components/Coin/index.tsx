import { useRef, FC } from "react";
import { TILE_SIZE, TILE_SETS } from "../../constants";
import { useAnimatedSprite } from "../../hooks";
import "./style.css";

const WIDTH = TILE_SIZE;
const HEIGHT = TILE_SIZE;

type CoinProps = { left: number; top: number };

const Coin: FC<CoinProps> = ({ left, top }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useAnimatedSprite({
    canvasRef,
    left,
    top,
    tileSet: TILE_SETS.Objects,
    width: WIDTH,
    height: HEIGHT,
    tileX: 0,
    tileY: 128,
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
