import { useRef, FC, useContext, useState, useEffect } from "react";
import { EVENTS, TILE_SETS } from "../../constants";
import { GlobalContext } from "../../contexts";
import { useSprite } from "../../hooks";
import "./style.css";

const WIDTH = 64;
const HEIGHT = 64;
const TILE_X = 992;

type CellarDoorProps = { top: number; left: number };

const CellarDoor: FC<CellarDoorProps> = ({ top, left }) => {
  const { setEvent } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setEvent(EVENTS.LEVER_ON, () => {
      setIsOpen(true);
    });
    setEvent(EVENTS.LEVER_OFF, () => {
      setIsOpen(false);
    });
  }, [setEvent]);

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
