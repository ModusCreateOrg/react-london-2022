import { useEffect } from "react";
import {
  WORLD_WIDTH,
  WORLD_HEIGHT,
  TILE_SIZE,
  TILE_SETS,
} from "../../constants";
import level from "../../level.json";
import "./style.css";

// Number of tiles in the tilset
const TILES_COUNT = 40;

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
      tileSet.src = TILE_SETS.World;
      tileSet.onload = () => {
        level.layers.forEach(({ chunks }) => {
          let i = 0;
          for (let y = 0; y < level.height; y++) {
            for (let x = 0; x < level.width; x++) {
              // Tiled exports tiles counting from 1 rather than 0
              const tile = chunks[0].data[i++] - 1;
              if (tile < 0) {
                continue;
              }

              const tileX = (tile % TILES_COUNT) * TILE_SIZE;
              const tileY = Math.floor(tile / TILES_COUNT) * TILE_SIZE;

              ctx.drawImage(
                tileSet,
                tileX,
                tileY,
                TILE_SIZE,
                TILE_SIZE,
                x * TILE_SIZE,
                y * TILE_SIZE,
                TILE_SIZE,
                TILE_SIZE
              );
            }
          }
        });
      };
    }
  }, []);

  return (
    <canvas
      id="world-canvas"
      width={WORLD_WIDTH}
      height={WORLD_HEIGHT}
    ></canvas>
  );
}
