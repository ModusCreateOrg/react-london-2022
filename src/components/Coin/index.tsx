import { useRef, FC, useContext, useState } from "react";
import { TILE_SIZE, TILE_SETS } from "../../constants";
import { GlobalContext } from "../../contexts";
import { useAnimatedSprite, useColliders } from "../../hooks";
import { Collider, ColliderType, Rect } from "../../utils";
import "./style.css";

const WIDTH = TILE_SIZE;
const HEIGHT = TILE_SIZE;
const TILE_X = 0;
const TILE_Y = 128;
const POINTS = 10;
const TIMEOUT = 2000;

type CoinProps = { left: number; top: number };

const Coin: FC<CoinProps> = ({ left, top }) => {
  const { setScore } = useContext(GlobalContext);
  const [isHidden, setIsHidden] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCollision = (c: Collider) => {
    setScore(POINTS);
    setIsHidden(true);
    c.hide();

    setTimeout(() => {
      c.show();
      setIsHidden(false);
    }, TIMEOUT);
  };
  const colliderRef = useRef<Collider>(
    new Collider(
      new Rect(left, top, WIDTH, HEIGHT),
      ColliderType.Bonus,
      onCollision
    )
  );

  useColliders(colliderRef);

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
      className={isHidden ? "hidden" : ""}
      ref={canvasRef}
      id="coin-canvas"
      width={WIDTH}
      height={HEIGHT}
    ></canvas>
  );
};

export default Coin;
