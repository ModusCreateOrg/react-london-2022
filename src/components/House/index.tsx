import { useEffect, FunctionComponent } from "react";
import { TILE_SETS } from "../../constants";
import "./style.css";

const WIDTH = 148;
const HEIGHT = 160;
const TILE_X = 198;
const TILE_Y = 0;

/*
 * TODO:
 * - useRef instead of getElementById
 * - util function for tile set, tiles and animation
 * - create global constants for tile sets and tile size
 * - prefer to return early, flip the if condition
 */
const House: FunctionComponent = () => {
  useEffect(() => {
    const canvas = document.getElementById(
      "house-canvas"
    ) as HTMLCanvasElement | null;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      canvas.style.left = "372px";
      canvas.style.top = "192px";

      const tileSet = new Image();
      tileSet.src = TILE_SETS.World;
      tileSet.onload = () => {
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
    }
  }, []);

  return <canvas id="house-canvas" width={WIDTH} height={HEIGHT}></canvas>;
};

export default House;
