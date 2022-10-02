import { useEffect } from "react";
import level from "../../level.json";
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
      const tileSet = new Image();
      tileSet.src = "assets/overworld.png";
      tileSet.onload = () => {
        level.layers.forEach(({ chunks }) => {
          let i = 0;
          for (let y = 0; y < level.height; y++) {
            for (let x = 0; x < level.width; x++) {
              const tile = chunks[0].data[i++] - 1;
              if (tile < 0) {
                continue;
              }

              const tileX = (tile % 40) * 32;
              const tileY = Math.floor(tile / 40) * 32;

              ctx.drawImage(
                tileSet,
                tileX,
                tileY,
                32,
                32,
                x * 32,
                y * 32,
                32,
                32
              );
            }
          }
        });
      };
    }
  }, []);

  return <canvas id="world-canvas" width="2048" height="1536"></canvas>;
}
