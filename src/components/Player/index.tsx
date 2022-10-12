import { useEffect, useRef, FC, useContext } from "react";
import {
  GAME_STATES,
  MAX_HEALTH,
  MIN_HEALTH,
  TILE_SETS,
} from "../../constants";
import { GlobalContext } from "../../contexts";
import { ColliderType, Rect, Vector } from "../../utils";
import { HEIGHT, Input, WIDTH } from "./constants";
import {
  drawFrame,
  getInputVector,
  walk,
  knockback,
  blink,
  getNextFrame,
  moveTo,
} from "./utils";
import "./style.css";

type PlayerProps = {
  top: number;
  left: number;
  onInteract: (isOpen: boolean | ((wasOpen: boolean) => boolean)) => void;
};

const Player: FC<PlayerProps> = ({ onInteract, top, left }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRect = useRef<Rect>(new Rect(left, top, WIDTH, HEIGHT));
  const invulnerable = useRef<boolean>(false);
  const keyPressed = useRef<boolean>(false);
  const direction = useRef<Vector>(Vector.Down);
  const currentFrame = useRef<number>(0);
  const { setGameState, playerHealth, setPlayerHealth, colliders } =
    useContext(GlobalContext);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!canvasRef.current || !ctx) {
      return;
    }

    moveTo(new Vector(left, top), canvasRef.current);

    const checkCollisions = () => {
      colliders.forEach((collider) => {
        if (!collider.current.rect.overlaps(playerRect.current)) {
          return;
        }

        if (
          collider.current.is(ColliderType.Health) &&
          playerHealth < MAX_HEALTH
        ) {
          collider.current.onCollision();
          setPlayerHealth(playerHealth + 1);
          return;
        }

        if (collider.current.is(ColliderType.Bonus)) {
          collider.current.onCollision();
          return;
        }

        if (collider.current.is(ColliderType.Damage) && !invulnerable.current) {
          collider.current.onCollision();

          const velocity = knockback(direction.current, canvasRef.current!);
          playerRect.current.moveBy(velocity.x, velocity.y);

          setPlayerHealth(playerHealth - 1);
          invulnerable.current = true;
          blink(canvasRef.current!, () => (invulnerable.current = false));
        }
      });
    };

    const tileSet = new Image();
    tileSet.src = TILE_SETS.Player;
    tileSet.onload = () => {
      drawFrame(ctx, tileSet, direction.current, currentFrame.current);

      window.onkeyup = () => {
        currentFrame.current = 0;
        keyPressed.current = false;
        drawFrame(ctx, tileSet, direction.current, currentFrame.current);
      };

      window.onkeydown = (event) => {
        if (!canvasRef.current) {
          return;
        }

        checkCollisions();

        if (playerHealth <= MIN_HEALTH) {
          setGameState(GAME_STATES.GameOver);
          return;
        }

        if (Input.Interact.includes(event.key)) {
          onInteract((wasOpen) => !wasOpen);
        }

        direction.current = getInputVector(event.key);
        const velocity = walk(direction.current, canvasRef.current);
        playerRect.current.moveBy(velocity.x, velocity.y);

        if (!keyPressed.current) {
          keyPressed.current = true;
          drawFrame(ctx, tileSet, direction.current, currentFrame.current);

          setTimeout(() => {
            keyPressed.current = false;
            currentFrame.current = getNextFrame(currentFrame.current);
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
