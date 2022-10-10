import { useEffect, useRef } from "react";
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

export default function World() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (!canvasRef.current || !ctx) {
      return;
    }

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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="world-canvas"
      width={WORLD_WIDTH}
      height={WORLD_HEIGHT}
    ></canvas>
  );
}
