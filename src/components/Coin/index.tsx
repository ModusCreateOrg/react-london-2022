import { useEffect, FunctionComponent } from "react";
import "./style.css";

/*
 * TODO:
 * - useRef instead of getElementById
 * - util function for tile set, tiles and animation
 * - create global constants for tile sets and tile size
 * - prefer to return early, flip the if condition
 * - clear interval on component destroy
 */
const Coin: FunctionComponent<{ left: number; top: number }> = ({
  left,
  top,
}) => {
  useEffect(() => {
    const canvas = document.getElementById(
      "coin-canvas"
    ) as HTMLCanvasElement | null;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      canvas.style.left = `${left}px`;
      canvas.style.top = `${top}px`;

      const tileSet = new Image();
      tileSet.src = "assets/objects.png";
      tileSet.onload = () => {
        let currentFrame = 0;

        setInterval(() => {
          ctx.clearRect(0, 0, 32, 32);

          if (currentFrame === 0) {
            ctx.drawImage(tileSet, 0, 128, 32, 32, 0, 0, 32, 32);
          } else if (currentFrame === 1) {
            ctx.drawImage(tileSet, 32, 128, 32, 32, 0, 0, 32, 32);
          } else if (currentFrame === 2) {
            ctx.drawImage(tileSet, 64, 128, 32, 32, 0, 0, 32, 32);
          } else if (currentFrame === 3) {
            ctx.drawImage(tileSet, 96, 128, 32, 32, 0, 0, 32, 32);
          }

          currentFrame = currentFrame === 3 ? 0 : currentFrame + 1;
        }, 100);
      };
    }
  }, [left, top]);

  return <canvas id="coin-canvas" width="32" height="32"></canvas>;
};

export default Coin;
