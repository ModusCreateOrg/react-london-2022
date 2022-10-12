import { useRef, FC, useState, useContext } from "react";
import { TILE_SIZE, TILE_SETS, EVENTS } from "../../constants";
import { GlobalContext } from "../../contexts";
import { useChangeEffect, useColliders, useSprite } from "../../hooks";
import { Collider, ColliderType, Rect } from "../../utils";
import "./style.css";

const WIDTH = TILE_SIZE;
const HEIGHT = TILE_SIZE;
const INTERACTION_RANGE = TILE_SIZE / 2;
const TILE_X = 64;

type LeverProps = {
  left: number;
  top: number;
};

const Lever: FC<LeverProps> = ({ left, top }) => {
  const [isOn, setIsOn] = useState(false);
  const { callEvent } = useContext(GlobalContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useChangeEffect(
    () => callEvent(isOn ? EVENTS.LEVER_ON : EVENTS.LEVER_OFF),
    [isOn]
  );

  const onCollision = () => setIsOn((v) => !v);
  const colliderRef = useRef<Collider>(
    new Collider(
      new Rect(left, top, WIDTH, HEIGHT, INTERACTION_RANGE, INTERACTION_RANGE),
      ColliderType.Object,
      onCollision
    )
  );

  useColliders(colliderRef);

  useSprite({
    canvasRef,
    left,
    top,
    tileSet: TILE_SETS.Objects,
    width: WIDTH,
    height: HEIGHT,
    tileX: isOn ? TILE_X + WIDTH : TILE_X,
    tileY: 288,
  });

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
