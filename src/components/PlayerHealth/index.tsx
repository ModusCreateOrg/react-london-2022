import { useRef, useContext, FC } from "react";
import { TILE_SIZE, TILE_SETS, MAX_HEALTH } from "../../constants";
import { GlobalContext } from "../../contexts";
import { useSprite } from "../../hooks";
import "./style.css";

const WIDTH = TILE_SIZE;
const HEIGHT = TILE_SIZE;
const TILE_X = 128;

const PlayerHealth: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playerHealth } = useContext(GlobalContext);

  useSprite({
    canvasRef,
    tileSet: TILE_SETS.Objects,
    width: WIDTH,
    height: HEIGHT,
    tileX: TILE_X + WIDTH * (MAX_HEALTH - playerHealth),
    tileY: 0,
  });

  return (
    <canvas
      ref={canvasRef}
      id="health-canvas"
      width={WIDTH}
      height={HEIGHT}
    ></canvas>
  );
};

export default PlayerHealth;
