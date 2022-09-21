import { useEffect, FunctionComponent } from "react";
import "./style.css";

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
      canvas.style.left = "26px";
      canvas.style.top = "20";

      const tileSet = new Image();
      tileSet.src = "assets/overworld.png";
      tileSet.onload = () => {
        ctx.drawImage(tileSet, 99, 0, 74, 80, 0, 0, 74, 80);
      };
    }
  }, []);

  return <canvas id="house-canvas" width="74" height="80"></canvas>;
};

export default House;
