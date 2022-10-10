import { useEffect, FunctionComponent } from "react";
import { TILE_SETS } from "../../constants";
import "./style.css";

const WIDTH = 32;
const HEIGHT = 48;
const TILE_X = 0;
const TILE_Y = 8;
const HUE_STEP = 10;

let increment = HUE_STEP;

/*
 * TODO:
 * - useRef instead of getElementById
 * - util function for tile set, tiles and animation
 * - create global constants for tile sets and tile size
 * - prefer to return early, flip the if condition
 * - clear interval on component destroy
 */
const Npc: FunctionComponent<{
  left: number;
  top: number;
}> = ({ left, top }) => {
  useEffect(() => {
    const canvas = document.getElementById(
      "npc-canvas"
    ) as HTMLCanvasElement | null;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      canvas.style.left = `${left}px`;
      canvas.style.top = `${top}px`;

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

      window.setInterval(() => {
        const currentHue = parseInt(
          canvas.style.filter.match(/\d+/)?.[0] || "0"
        );
        if (currentHue === 360) {
          increment = -HUE_STEP;
        } else if (currentHue === 0) {
          increment = HUE_STEP;
        }
        const hue = Math.max(0, Math.min(360, currentHue + increment));
        canvas.style.filter = `hue-rotate(${hue}deg)`;
      }, 100);
    }
  }, [left, top]);

  return <canvas id="npc-canvas" width={WIDTH} height={HEIGHT}></canvas>;
};
export default Npc;
