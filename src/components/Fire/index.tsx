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
const Fire: FunctionComponent<{ left: number; top: number }> = ({
  left,
  top,
}) => {
  useEffect(() => {
    const canvas = document.getElementById(
      "fire-canvas"
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
            ctx.drawImage(tileSet, 130, 98, 32, 32, 0, 0, 32, 32);
          } else if (currentFrame === 1) {
            ctx.drawImage(tileSet, 162, 98, 32, 32, 0, 0, 32, 32);
          } else if (currentFrame === 2) {
            ctx.drawImage(tileSet, 194, 98, 32, 32, 0, 0, 32, 32);
          } else if (currentFrame === 3) {
            ctx.drawImage(tileSet, 226, 98, 32, 32, 0, 0, 32, 32);
          } else if (currentFrame === 4) {
            ctx.drawImage(tileSet, 258, 98, 32, 32, 0, 0, 32, 32);
          } else if (currentFrame === 5) {
            ctx.drawImage(tileSet, 290, 98, 32, 32, 0, 0, 32, 32);
          } else if (currentFrame === 6) {
            ctx.drawImage(tileSet, 322, 98, 32, 32, 0, 0, 32, 32);
          }

          currentFrame = currentFrame === 6 ? 0 : currentFrame + 1;
        }, 125);
      };
    }
  }, [left, top]);

  return <canvas id="fire-canvas" width="32" height="32"></canvas>;
};

export default Fire;
