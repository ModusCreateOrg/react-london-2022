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
      canvas.style.left = "372px";
      canvas.style.top = "192px";

      const tileSet = new Image();
      tileSet.src = "assets/overworld.png";
      tileSet.onload = () => {
        ctx.drawImage(tileSet, 198, 0, 148, 160, 0, 0, 148, 160);
      };
    }
  }, []);

  return <canvas id="house-canvas" width="148" height="160"></canvas>;
};

export default House;
