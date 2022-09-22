import { useEffect, FunctionComponent } from "react";
import "./style.css";

let increment = 10;

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
      tileSet.src = "assets/npc.png";
      tileSet.onload = () => {
        ctx.clearRect(0, 0, 16, 16);
        ctx.drawImage(tileSet, 0, 4, 16, 24, 4, 0, 16, 24);
      };

      window.setInterval(() => {
        const currentHue = parseInt(
          canvas.style.filter.match(/\d+/)?.[0] || "0"
        );
        if (currentHue === 360) {
          increment = -10;
        } else if (currentHue === 0) {
          increment = 10;
        }
        const hue = Math.max(0, Math.min(360, currentHue + increment));
        canvas.style.filter = `hue-rotate(${hue}deg)`;
      }, 100);
    }
  }, [left, top]);

  return <canvas id="npc-canvas" width="24" height="24"></canvas>;
};

export default Npc;
