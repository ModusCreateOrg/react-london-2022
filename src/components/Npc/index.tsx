import { useEffect, useRef, FC } from "react";
import { TILE_SETS } from "../../constants";
import "./style.css";

const WIDTH = 32;
const HEIGHT = 48;
const TILE_X = 0;
const TILE_Y = 8;
const HUE_STEP = 10;

let increment = HUE_STEP;

type NpcProps = { left: number; top: number };

/*
 * TODO:
 * - util function for tile set, tiles and animation
 */
const Npc: FC<NpcProps> = ({ left, top }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    let intervalId: number;

    if (!canvasRef.current || !ctx) {
      return;
    }

    canvasRef.current.style.left = `${left}px`;
    canvasRef.current.style.top = `${top}px`;

    const tileSet = new Image();
    tileSet.src = TILE_SETS.Npc;
    tileSet.onload = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.drawImage(
        tileSet,
        TILE_X,
        TILE_Y,
        WIDTH,
        HEIGHT,
        0,
        0,
        WIDTH,
        HEIGHT
      );
    };

    intervalId = window.setInterval(() => {
      if (!canvasRef.current) {
        return;
      }

      const currentHue = parseInt(
        canvasRef.current.style.filter.match(/\d+/)?.[0] || "0"
      );
      if (currentHue === 360) {
        increment = -HUE_STEP;
      } else if (currentHue === 0) {
        increment = HUE_STEP;
      }
      const hue = Math.max(0, Math.min(360, currentHue + increment));
      canvasRef.current.style.filter = `hue-rotate(${hue}deg)`;
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [left, top]);

  return (
    <canvas
      ref={canvasRef}
      id="npc-canvas"
      width={WIDTH}
      height={HEIGHT}
    ></canvas>
  );
};
export default Npc;
