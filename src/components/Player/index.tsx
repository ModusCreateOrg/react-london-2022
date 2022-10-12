import { useEffect, useRef, FC, useContext } from "react";
import {
  GAME_STATES,
  MAX_HEALTH,
  MIN_HEALTH,
  TILE_SETS,
} from "../../constants";
import { GlobalContext } from "../../contexts";
import { ColliderType, Rect, Vector } from "../../utils";
import { ANIMATION_LENGTH, HEIGHT, Input, WIDTH } from "./constants";
import { drawFrame, getInputVector, walk, knockback } from "./utils";
import "./style.css";

type PlayerProps = {
  top: number;
  left: number;
  onInteract: (isOpen: boolean | ((wasOpen: boolean) => boolean)) => void;
};

/*
 * TODO:
 * - move player controls to global context
 * - use input loop to remove keydown delay
 */
let invulnerable = false;
const Player: FC<PlayerProps> = ({ onInteract, top, left }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRect = useRef<Rect>(new Rect(left, top, WIDTH, HEIGHT));
  const { setGameState, playerHealth, setPlayerHealth, colliders } =
    useContext(GlobalContext);

  useEffect(() => {
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

        colliders.forEach((collider) => {
          if (!collider.current.rect.overlaps(playerRect.current)) {
            return;
          }

          if (
            collider.current.type === ColliderType.Health &&
            playerHealth < MAX_HEALTH
          ) {
            collider.current.onCollision();
            setPlayerHealth(Math.min(MAX_HEALTH, playerHealth + 1));
          } else if (collider.current.type === ColliderType.Bonus) {
            collider.current.onCollision();
            // TODO
          } else if (
            collider.current.type === ColliderType.Damage &&
            !invulnerable
          ) {
            collider.current.onCollision();

            const velocity = knockback(direction, canvasRef.current!);
            playerRect.current.moveBy(velocity.x, velocity.y);

            setPlayerHealth(Math.max(MIN_HEALTH, playerHealth - 1));
            invulnerable = true;
            canvasRef.current!.style.filter = "brightness(6)";

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
        });

        if (playerHealth <= MIN_HEALTH) {
          setGameState(GAME_STATES.GameOver);
          return;
        }

        if (Input.Interact.includes(event.key)) {
          onInteract((wasOpen) => !wasOpen);
        }

        direction = getInputVector(event.key);
        const velocity = walk(direction, canvasRef.current);
        playerRect.current.moveBy(velocity.x, velocity.y);

        if (!keyPressed) {
          keyPressed = true;
          drawFrame(ctx, tileSet, direction, currentFrame);

          setTimeout(() => {
            keyPressed = false;
            currentFrame =
              currentFrame === ANIMATION_LENGTH ? 0 : currentFrame + 1;
          }, 125);
        }
      };
    };
  }, [
    onInteract,
    setPlayerHealth,
    playerHealth,
    setGameState,
    top,
    left,
    colliders,
  ]);

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
