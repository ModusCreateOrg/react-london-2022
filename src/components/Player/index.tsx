import { useEffect, FunctionComponent } from "react";
import "./style.css";

/*
 * TODO:
 * - 2D Vectors for movement direction
 * - useRef instead of getElementById
 * - util function for tile set, tiles and animation
 * - create global constants for tile sets and tile size
 * - prefer to return early, flip the if condition
 * - move object specific interactions outside of Player
 * - move player controls to global context
 */
const Player: FunctionComponent<{
  openCellarDoor: (isOpen: boolean | ((wasOpen: boolean) => boolean)) => void;
}> = ({ openCellarDoor }) => {
  useEffect(() => {
    const canvas = document.getElementById(
      "player-canvas"
    ) as HTMLCanvasElement | null;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      const tileSet = new Image();
      tileSet.src = "assets/character.png";
      tileSet.onload = () => {
        let keyPressed = false;
        let currentFrame = 0;
        ctx.drawImage(tileSet, 0, 4, 16, 24, 4, 0, 16, 24);

        window.onkeyup = () => {
          currentFrame = 0;
          ctx.clearRect(0, 0, 24, 24);
          ctx.drawImage(tileSet, 0, 4, 16, 24, 4, 0, 16, 24);
        };

        window.onkeydown = (event) => {
          if (event.key === " " || event.key === "Enter") {
            openCellarDoor((wasOpen) => !wasOpen);
          } else if (event.key === "w" || event.key === "ArrowUp") {
            canvas.style.top = `${parseInt(canvas.style.top || "0") - 2}px`;
          } else if (event.key === "s" || event.key === "ArrowDown") {
            canvas.style.top = `${parseInt(canvas.style.top || "0") + 2}px`;
          } else if (event.key === "a" || event.key === "ArrowLeft") {
            canvas.style.left = `${parseInt(canvas.style.left || "0") - 2}px`;
          } else if (event.key === "d" || event.key === "ArrowRight") {
            canvas.style.left = `${parseInt(canvas.style.left || "0") + 2}px`;
          }

          if (!keyPressed) {
            keyPressed = true;
            ctx.clearRect(0, 0, 24, 24);

            if (currentFrame === 0) {
              ctx.drawImage(tileSet, 0, 4, 16, 24, 4, 0, 16, 24);
            } else if (currentFrame === 1) {
              ctx.drawImage(tileSet, 16, 4, 16, 24, 4, 0, 16, 24);
            } else if (currentFrame === 2) {
              ctx.drawImage(tileSet, 0, 4, 16, 24, 4, 0, 16, 24);
            } else if (currentFrame === 3) {
              ctx.drawImage(tileSet, 48, 4, 16, 24, 4, 0, 16, 24);
            }

            setTimeout(() => {
              keyPressed = false;
              currentFrame = currentFrame === 3 ? 0 : currentFrame + 1;
            }, 125);
          }
        };
      };
    }
  }, [openCellarDoor]);

  return <canvas id="player-canvas" width="24" height="24"></canvas>;
};

export default Player;
