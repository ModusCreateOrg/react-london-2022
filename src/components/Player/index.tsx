import { useEffect, FunctionComponent, useState } from "react";
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
 * - use input loop to remove keydown delay
 * - create util function for collisions
 */
const Player: FunctionComponent<{
  health: number;
  openCellarDoor: (isOpen: boolean | ((wasOpen: boolean) => boolean)) => void;
  onCollision: (health: number | ((prev: number) => number)) => void;
}> = ({ health, openCellarDoor, onCollision }) => {
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

    if (healthCanvas) {
      const ctx = healthCanvas.getContext("2d");
      if (ctx) {
        const tileSet = new Image();
        tileSet.src = "assets/objects.png";
        tileSet.onload = () => {
          ctx.clearRect(0, 0, 15, 13);
          if (health === 4) {
            ctx.drawImage(tileSet, 64, 2, 15, 13, 0, 0, 15, 13);
          } else if (health === 3) {
            ctx.drawImage(tileSet, 80, 2, 15, 13, 0, 0, 15, 13);
          } else if (health === 2) {
            ctx.drawImage(tileSet, 96, 2, 15, 13, 0, 0, 15, 13);
          } else if (health === 1) {
            ctx.drawImage(tileSet, 112, 2, 15, 13, 0, 0, 15, 13);
          } else if (health === 0) {
            ctx.drawImage(tileSet, 128, 2, 15, 13, 0, 0, 15, 13);
          }
        };
      }
    }

    if (canvas) {
      canvas.style.top = canvas.style.top || "64px";
      canvas.style.left = canvas.style.left || "50px";
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const tileSet = new Image();
        tileSet.src = "assets/character.png";
        tileSet.onload = () => {
          let keyPressed = false;
          let currentFrame = 0;
          let invulnerable = false;
          ctx.drawImage(tileSet, 0, 4, 16, 24, 4, 0, 16, 24);

          window.onkeyup = () => {
            currentFrame = 0;
            keyPressed = false;
            ctx.clearRect(0, 0, 24, 24);
            ctx.drawImage(tileSet, 0, 4, 16, 24, 4, 0, 16, 24);
          };

          window.onkeydown = (event) => {
            if (health > 0) {
              if (health < 4) {
                if (
                  heartCanvas &&
                  parseInt(canvas.style.left || "0") + 3 <=
                    parseInt(heartCanvas.style.left || "0") + 8 &&
                  parseInt(canvas.style.left || "0") + 18 >=
                    parseInt(heartCanvas.style.left || "0") &&
                  parseInt(canvas.style.top || "0") + 18 <=
                    parseInt(heartCanvas.style.top || "0") + 16 &&
                  parseInt(canvas.style.top || "0") + 18 >=
                    parseInt(heartCanvas.style.top || "0") + 8
                ) {
                  onCollision((health) => Math.min(4, health + 1));
                  heartCanvas.remove();
                }
              }

              if (event.key === " " || event.key === "Enter") {
                openCellarDoor((wasOpen) => !wasOpen);
              } else if (event.key === "w" || event.key === "ArrowUp") {
                canvas.style.top = `${parseInt(canvas.style.top || "0") - 2}px`;
              } else if (event.key === "s" || event.key === "ArrowDown") {
                canvas.style.top = `${parseInt(canvas.style.top || "0") + 2}px`;
              } else if (event.key === "a" || event.key === "ArrowLeft") {
                canvas.style.left = `${
                  parseInt(canvas.style.left || "0") - 2
                }px`;
              } else if (event.key === "d" || event.key === "ArrowRight") {
                canvas.style.left = `${
                  parseInt(canvas.style.left || "0") + 2
                }px`;
              }

              if (
                fireCanvas &&
                !invulnerable &&
                parseInt(canvas.style.left || "0") + 3 <=
                  parseInt(fireCanvas.style.left || "0") + 8 &&
                parseInt(canvas.style.left || "0") + 18 >=
                  parseInt(fireCanvas.style.left || "0") &&
                parseInt(canvas.style.top || "0") + 18 <=
                  parseInt(fireCanvas.style.top || "0") + 16 &&
                parseInt(canvas.style.top || "0") + 18 >=
                  parseInt(fireCanvas.style.top || "0") + 8
              ) {
                if (event.key === "w" || event.key === "ArrowUp") {
                  canvas.style.top = `${Math.min(
                    window.innerHeight,
                    parseInt(canvas.style.top || "0") + 24
                  )}px`;
                } else if (event.key === "s" || event.key === "ArrowDown") {
                  canvas.style.top = `${Math.max(
                    0,
                    parseInt(canvas.style.top || "0") - 24
                  )}px`;
                } else if (event.key === "a" || event.key === "ArrowLeft") {
                  canvas.style.left = `${Math.min(
                    window.innerWidth,
                    parseInt(canvas.style.left || "0") + 24
                  )}px`;
                } else if (event.key === "d" || event.key === "ArrowRight") {
                  canvas.style.left = `${Math.max(
                    0,
                    parseInt(canvas.style.left || "0") - 24
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
            }
          };
        };
      }
    }
  }, [openCellarDoor, onCollision, health]);

  return (
    <>
      <canvas id="player-canvas" width="24" height="24"></canvas>
      <canvas id="health-canvas" width="15" height="13"></canvas>
    </>
  );
};

export default Player;
