import { useEffect, useRef, FC, useContext } from "react";
import { GAME_STATES, TILE_SETS } from "../../constants";
import { GlobalContext } from "../../contexts";
import { Vector } from "../../utils";
import { ANIMATION_LENGTH, HEIGHT, Input, WIDTH } from "./constants";
import { drawFrame, getInputVector, move } from "./utils";
import "./style.css";

type PlayerProps = {
  top: number;
  left: number;
  onInteract: (isOpen: boolean | ((wasOpen: boolean) => boolean)) => void;
  onCollision: (health: number | ((prev: number) => number)) => void;
};

/*
 * TODO:
 * - move object specific interactions outside of Player
 * - move player controls to global context
 * - use input loop to remove keydown delay
 * - create util function for collisions
 */
let invulnerable = false;
const Player: FC<PlayerProps> = ({ onInteract, onCollision, top, left }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setGameState, playerHealth } = useContext(GlobalContext);

  useEffect(() => {
    const fireCanvas = document.getElementById(
      "fire-canvas"
    ) as HTMLCanvasElement | null;
    const heartCanvas = document.getElementById(
      "heart-canvas"
    ) as HTMLCanvasElement | null;
    const coinCanvas = document.getElementById(
      "coin-canvas"
    ) as HTMLCanvasElement | null;

    const ctx = canvasRef.current?.getContext("2d");
    if (!canvasRef.current || !ctx) {
      return;
    }

    canvasRef.current.style.top = canvasRef.current.style.top || `${top}px`;
    canvasRef.current.style.left = canvasRef.current.style.left || `${left}px`;

    const tileSet = new Image();
    tileSet.src = TILE_SETS.Player;
    tileSet.onload = () => {
      let keyPressed = false;
      let direction = Vector.Down;
      let currentFrame = 0;

      drawFrame(ctx, tileSet, direction, currentFrame);

      window.onkeyup = () => {
        currentFrame = 0;
        keyPressed = false;
        drawFrame(ctx, tileSet, direction, currentFrame);
      };

      window.onkeydown = (event) => {
        if (!canvasRef.current) {
          return;
        }

        if (playerHealth > 0) {
          if (playerHealth < 4) {
            if (
              heartCanvas &&
              parseInt(canvasRef.current.style.left || "0") + 6 <=
                parseInt(heartCanvas.style.left || "0") + 16 &&
              parseInt(canvasRef.current.style.left || "0") + 36 >=
                parseInt(heartCanvas.style.left || "0") &&
              parseInt(canvasRef.current.style.top || "0") + 36 <=
                parseInt(heartCanvas.style.top || "0") + 32 &&
              parseInt(canvasRef.current.style.top || "0") + 36 >=
                parseInt(heartCanvas.style.top || "0") + 16
            ) {
              onCollision((playerHealth) => Math.min(4, playerHealth + 1));
              heartCanvas.remove();
            }
          }

          if (
            coinCanvas &&
            parseInt(canvasRef.current.style.left || "0") + 6 <=
              parseInt(coinCanvas.style.left || "0") + 16 &&
            parseInt(canvasRef.current.style.left || "0") + 36 >=
              parseInt(coinCanvas.style.left || "0") &&
            parseInt(canvasRef.current.style.top || "0") + 36 <=
              parseInt(coinCanvas.style.top || "0") + 32 &&
            parseInt(canvasRef.current.style.top || "0") + 36 >=
              parseInt(coinCanvas.style.top || "0") + 16
          ) {
            coinCanvas.remove();
          }

          if (Input.Interact.includes(event.key)) {
            onInteract((wasOpen) => !wasOpen);
          }

          direction = getInputVector(event.key);
          move(direction, canvasRef.current);

          if (
            fireCanvas &&
            !invulnerable &&
            parseInt(canvasRef.current.style.left || "0") + 6 <=
              parseInt(fireCanvas.style.left || "0") + 16 &&
            parseInt(canvasRef.current.style.left || "0") + 36 >=
              parseInt(fireCanvas.style.left || "0") &&
            parseInt(canvasRef.current.style.top || "0") + 36 <=
              parseInt(fireCanvas.style.top || "0") + 32 &&
            parseInt(canvasRef.current.style.top || "0") + 36 >=
              parseInt(fireCanvas.style.top || "0") + 16
          ) {
            if (event.key === "w" || event.key === "ArrowUp") {
              canvasRef.current.style.top = `${Math.min(
                window.innerHeight,
                parseInt(canvasRef.current.style.top || "0") + 48
              )}px`;
            } else if (event.key === "s" || event.key === "ArrowDown") {
              canvasRef.current.style.top = `${Math.max(
                0,
                parseInt(canvasRef.current.style.top || "0") - 48
              )}px`;
            } else if (event.key === "a" || event.key === "ArrowLeft") {
              canvasRef.current.style.left = `${Math.min(
                window.innerWidth,
                parseInt(canvasRef.current.style.left || "0") + 48
              )}px`;
            } else if (event.key === "d" || event.key === "ArrowRight") {
              canvasRef.current.style.left = `${Math.max(
                0,
                parseInt(canvasRef.current.style.left || "0") - 48
              )}px`;
            }

            onCollision((playerHealth) => Math.max(0, playerHealth - 1));
            invulnerable = true;
            canvasRef.current.style.filter = "brightness(6)";

            const interval = setInterval(() => {
              if (!canvasRef.current) {
                return;
              }

              canvasRef.current.style.filter =
                canvasRef.current.style.filter.includes("1")
                  ? "brightness(6)"
                  : "brightness(1)";
            }, 100);

            setTimeout(() => {
              clearInterval(interval);
              if (!canvasRef.current) {
                return;
              }
              canvasRef.current.style.filter = "brightness(1)";
              invulnerable = false;
            }, 1500);
          }

          if (!keyPressed) {
            keyPressed = true;
            drawFrame(ctx, tileSet, direction, currentFrame);

            setTimeout(() => {
              keyPressed = false;
              currentFrame =
                currentFrame === ANIMATION_LENGTH ? 0 : currentFrame + 1;
            }, 125);
          }
        } else {
          setGameState(GAME_STATES.GameOver);
        }
      };
    };
  }, [onInteract, onCollision, playerHealth, setGameState, top, left]);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="player-canvas"
        width={WIDTH}
        height={HEIGHT}
      ></canvas>
    </>
  );
};

export default Player;
