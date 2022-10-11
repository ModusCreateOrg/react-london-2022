import { useEffect, useRef, FC, useContext } from "react";
import { GAME_STATES, TILE_SETS, TILE_SIZE } from "../../constants";
import { GlobalContext } from "../../contexts";
import "./style.css";

const WIDTH = 32;
const HEIGHT = 48;
const TILE_X = 0;
const TILE_Y = 8;
const ANIMATION_LENGTH = 3;

type PlayerProps = {
  top: number;
  left: number;
  onInteract: (isOpen: boolean | ((wasOpen: boolean) => boolean)) => void;
  onCollision: (health: number | ((prev: number) => number)) => void;
};

/*
 * TODO:
 * - 2D Vectors for movement direction
 * - util function for tile set, tiles and animation
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

    if (!canvasRef.current) {
      return;
    }

    canvasRef.current.style.top = canvasRef.current.style.top || `${top}px`;
    canvasRef.current.style.left = canvasRef.current.style.left || `${left}px`;
    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) {
      return;
    }

    const tileSet = new Image();
    tileSet.src = TILE_SETS.Player;
    tileSet.onload = () => {
      let keyPressed = false;
      let direction = "down";
      let currentFrame = 0;
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

      window.onkeyup = () => {
        currentFrame = 0;
        keyPressed = false;
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        if (direction === "up") {
          ctx.drawImage(
            tileSet,
            TILE_X,
            TILE_Y + TILE_SIZE * 4,
            WIDTH,
            HEIGHT,
            0,
            0,
            WIDTH,
            HEIGHT
          );
        } else if (direction === "left") {
          ctx.drawImage(
            tileSet,
            TILE_X,
            TILE_Y + TILE_SIZE * 6,
            WIDTH,
            HEIGHT,
            0,
            0,
            WIDTH,
            HEIGHT
          );
        } else if (direction === "down") {
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
        } else if (direction === "right") {
          ctx.drawImage(
            tileSet,
            TILE_X,
            TILE_Y + TILE_SIZE * 2,
            WIDTH,
            HEIGHT,
            0,
            0,
            WIDTH,
            HEIGHT
          );
        }
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

          if (event.key === " " || event.key === "Enter") {
            onInteract((wasOpen) => !wasOpen);
          } else if (event.key === "w" || event.key === "ArrowUp") {
            direction = "up";
            canvasRef.current.style.top = `${
              parseInt(canvasRef.current.style.top || "0") - 4
            }px`;
          } else if (event.key === "s" || event.key === "ArrowDown") {
            direction = "down";
            canvasRef.current.style.top = `${
              parseInt(canvasRef.current.style.top || "0") + 4
            }px`;
          } else if (event.key === "a" || event.key === "ArrowLeft") {
            direction = "left";
            canvasRef.current.style.left = `${
              parseInt(canvasRef.current.style.left || "0") - 4
            }px`;
          } else if (event.key === "d" || event.key === "ArrowRight") {
            direction = "right";
            canvasRef.current.style.left = `${
              parseInt(canvasRef.current.style.left || "0") + 4
            }px`;
          }

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
            ctx.clearRect(0, 0, WIDTH, HEIGHT);

            if (direction === "up") {
              ctx.drawImage(
                tileSet,
                TILE_X + WIDTH * currentFrame,
                TILE_Y + TILE_SIZE * 4,
                WIDTH,
                HEIGHT,
                0,
                0,
                WIDTH,
                HEIGHT
              );
            }
            if (direction === "left") {
              ctx.drawImage(
                tileSet,
                TILE_X + WIDTH * currentFrame,
                TILE_Y + TILE_SIZE * 6,
                WIDTH,
                HEIGHT,
                0,
                0,
                WIDTH,
                HEIGHT
              );
            }
            if (direction === "down") {
              ctx.drawImage(
                tileSet,
                TILE_X + WIDTH * currentFrame,
                TILE_Y,
                WIDTH,
                HEIGHT,
                0,
                0,
                WIDTH,
                HEIGHT
              );
            }
            if (direction === "right") {
              ctx.drawImage(
                tileSet,
                TILE_X + WIDTH * currentFrame,
                TILE_Y + TILE_SIZE * 2,
                WIDTH,
                HEIGHT,
                0,
                0,
                WIDTH,
                HEIGHT
              );
            }

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
