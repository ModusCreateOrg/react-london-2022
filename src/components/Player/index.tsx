import { useEffect, FunctionComponent, useContext } from "react";
import { GAME_STATES, TILE_SETS, TILE_SIZE } from "../../constants";
import { GlobalContext } from "../../contexts";
import "./style.css";

const WIDTH = 32;
const HEIGHT = 48;
const TILE_X = 0;
const TILE_Y = 8;
const ANIMATION_LENGTH = 3;

/*
 * TODO:
 * - 2D Vectors for movement direction
 * - useRef instead of getElementById
 * - util function for tile set, tiles and animation
 * - create global constants for tile sets and tile size
 * - prefer to return early, flip the if condition
 * - move object specific interactions outside of Player
 * - move player controls to global context
 * - use input loop to remove keydown delay
 * - create util function for collisions
 */
let invulnerable = false;
const Player: FunctionComponent<{
  health: number;
  onInteract: (isOpen: boolean | ((wasOpen: boolean) => boolean)) => void;
  onCollision: (health: number | ((prev: number) => number)) => void;
}> = ({ health, onInteract, onCollision }) => {
  const { setGameState } = useContext(GlobalContext);
  useEffect(() => {
    const canvas = document.getElementById(
      "player-canvas"
    ) as HTMLCanvasElement | null;
    const fireCanvas = document.getElementById(
      "fire-canvas"
    ) as HTMLCanvasElement | null;
    const healthCanvas = document.getElementById(
      "health-canvas"
    ) as HTMLCanvasElement | null;
    const heartCanvas = document.getElementById(
      "heart-canvas"
    ) as HTMLCanvasElement | null;
    const coinCanvas = document.getElementById(
      "coin-canvas"
    ) as HTMLCanvasElement | null;

    if (healthCanvas) {
      const ctx = healthCanvas.getContext("2d");
      if (ctx) {
        const tileSet = new Image();
        tileSet.src = TILE_SETS.Objects;
        tileSet.onload = () => {
          ctx.clearRect(0, 0, 30, 26);
          if (health === 4) {
            ctx.drawImage(tileSet, 128, 4, 30, 26, 0, 0, 30, 26);
          } else if (health === 3) {
            ctx.drawImage(tileSet, 160, 4, 30, 26, 0, 0, 30, 26);
          } else if (health === 2) {
            ctx.drawImage(tileSet, 192, 4, 30, 26, 0, 0, 30, 26);
          } else if (health === 1) {
            ctx.drawImage(tileSet, 224, 4, 30, 26, 0, 0, 30, 26);
          } else if (health === 0) {
            ctx.drawImage(tileSet, 256, 4, 30, 26, 0, 0, 30, 26);
          }
        };
      }
    }

    if (canvas) {
      canvas.style.top = canvas.style.top || "328px";
      canvas.style.left = canvas.style.left || "420px";
      const ctx = canvas.getContext("2d");

      if (ctx) {
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
            if (health > 0) {
              if (health < 4) {
                if (
                  heartCanvas &&
                  parseInt(canvas.style.left || "0") + 6 <=
                    parseInt(heartCanvas.style.left || "0") + 16 &&
                  parseInt(canvas.style.left || "0") + 36 >=
                    parseInt(heartCanvas.style.left || "0") &&
                  parseInt(canvas.style.top || "0") + 36 <=
                    parseInt(heartCanvas.style.top || "0") + 32 &&
                  parseInt(canvas.style.top || "0") + 36 >=
                    parseInt(heartCanvas.style.top || "0") + 16
                ) {
                  onCollision((health) => Math.min(4, health + 1));
                  heartCanvas.remove();
                }
              }

              if (
                coinCanvas &&
                parseInt(canvas.style.left || "0") + 6 <=
                  parseInt(coinCanvas.style.left || "0") + 16 &&
                parseInt(canvas.style.left || "0") + 36 >=
                  parseInt(coinCanvas.style.left || "0") &&
                parseInt(canvas.style.top || "0") + 36 <=
                  parseInt(coinCanvas.style.top || "0") + 32 &&
                parseInt(canvas.style.top || "0") + 36 >=
                  parseInt(coinCanvas.style.top || "0") + 16
              ) {
                coinCanvas.remove();
              }

              if (event.key === " " || event.key === "Enter") {
                onInteract((wasOpen) => !wasOpen);
              } else if (event.key === "w" || event.key === "ArrowUp") {
                direction = "up";
                canvas.style.top = `${parseInt(canvas.style.top || "0") - 4}px`;
              } else if (event.key === "s" || event.key === "ArrowDown") {
                direction = "down";
                canvas.style.top = `${parseInt(canvas.style.top || "0") + 4}px`;
              } else if (event.key === "a" || event.key === "ArrowLeft") {
                direction = "left";
                canvas.style.left = `${
                  parseInt(canvas.style.left || "0") - 4
                }px`;
              } else if (event.key === "d" || event.key === "ArrowRight") {
                direction = "right";
                canvas.style.left = `${
                  parseInt(canvas.style.left || "0") + 4
                }px`;
              }

              if (
                fireCanvas &&
                !invulnerable &&
                parseInt(canvas.style.left || "0") + 6 <=
                  parseInt(fireCanvas.style.left || "0") + 16 &&
                parseInt(canvas.style.left || "0") + 36 >=
                  parseInt(fireCanvas.style.left || "0") &&
                parseInt(canvas.style.top || "0") + 36 <=
                  parseInt(fireCanvas.style.top || "0") + 32 &&
                parseInt(canvas.style.top || "0") + 36 >=
                  parseInt(fireCanvas.style.top || "0") + 16
              ) {
                if (event.key === "w" || event.key === "ArrowUp") {
                  canvas.style.top = `${Math.min(
                    window.innerHeight,
                    parseInt(canvas.style.top || "0") + 48
                  )}px`;
                } else if (event.key === "s" || event.key === "ArrowDown") {
                  canvas.style.top = `${Math.max(
                    0,
                    parseInt(canvas.style.top || "0") - 48
                  )}px`;
                } else if (event.key === "a" || event.key === "ArrowLeft") {
                  canvas.style.left = `${Math.min(
                    window.innerWidth,
                    parseInt(canvas.style.left || "0") + 48
                  )}px`;
                } else if (event.key === "d" || event.key === "ArrowRight") {
                  canvas.style.left = `${Math.max(
                    0,
                    parseInt(canvas.style.left || "0") - 48
                  )}px`;
                }

                onCollision((health) => Math.max(0, health - 1));
                invulnerable = true;
                canvas.style.filter = "brightness(6)";

                const interval = setInterval(() => {
                  canvas.style.filter = canvas.style.filter.includes("1")
                    ? "brightness(6)"
                    : "brightness(1)";
                }, 100);

                setTimeout(() => {
                  clearInterval(interval);
                  canvas.style.filter = "brightness(1)";
                  invulnerable = false;
                }, 1500);
              }

              if (!keyPressed) {
                keyPressed = true;
                ctx.clearRect(0, 0, WIDTH, HEIGHT);

                if (currentFrame === 0) {
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
                  }
                  if (direction === "left") {
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
                  }
                  if (direction === "down") {
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
                  }
                  if (direction === "right") {
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
                } else if (currentFrame === 1) {
                  if (direction === "up") {
                    ctx.drawImage(
                      tileSet,
                      TILE_X + WIDTH,
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
                      TILE_X + WIDTH,
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
                      TILE_X + WIDTH,
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
                      TILE_X + WIDTH,
                      TILE_Y + TILE_SIZE * 2,
                      WIDTH,
                      HEIGHT,
                      0,
                      0,
                      WIDTH,
                      HEIGHT
                    );
                  }
                } else if (currentFrame === 2) {
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
                  }
                  if (direction === "left") {
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
                  }
                  if (direction === "down") {
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
                  }
                  if (direction === "right") {
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
                } else if (currentFrame === 3) {
                  if (direction === "up") {
                    ctx.drawImage(
                      tileSet,
                      TILE_X + WIDTH * 3,
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
                      TILE_X + WIDTH * 3,
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
                      TILE_X + WIDTH * 3,
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
                      TILE_X + WIDTH * 3,
                      TILE_Y + TILE_SIZE * 2,
                      WIDTH,
                      HEIGHT,
                      0,
                      0,
                      WIDTH,
                      HEIGHT
                    );
                  }
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
      }
    }
  }, [onInteract, onCollision, health, setGameState]);

  return (
    <>
      <canvas id="player-canvas" width={WIDTH} height={HEIGHT}></canvas>
      <canvas id="health-canvas" width="30" height="26"></canvas>
    </>
  );
};

export default Player;
