import { useEffect } from "react";
import "./style.css";

/*
 * Refactor:
 * - useRef instead of getElementById
 * - useContext to provide global tile count for rows and columns
 * - create global constants for tile sets and tile size
 * - create util to draw different tiles of a tile set: drawGrass(x, y), drawStone(x, y)
 * - prefer to return early, flip the if condition
 */
export default function World() {
  useEffect(() => {
    const canvas = document.getElementById(
      "world-canvas"
    ) as HTMLCanvasElement | null;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const tileSet = new Image();
      tileSet.src = "assets/overworld.png";
      tileSet.onload = () => {
        const tileCountHorizontal = Math.ceil(canvas.width / 16);
        const tileCountVertical = Math.ceil(canvas.height / 16);

        for (let y = 0; y < tileCountVertical; y++) {
          for (let x = 0; x < tileCountHorizontal; x++) {
            ctx.drawImage(tileSet, 0, 0, 16, 16, x * 16, y * 16, 16, 16);
          }
        }
      };
    }
  }, []);

  return <canvas id="world-canvas"></canvas>;
}
