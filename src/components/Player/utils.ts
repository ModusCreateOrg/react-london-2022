import { Vector } from "../../utils";
import { TILE_SIZE } from "../../constants";
import { Input, WIDTH, HEIGHT, TILE_X, TILE_Y, SPEED } from "./constants";

export const getSpritePos = (direction: Vector, currentFrame: number) => {
  let yMultiplier = 0;

  if (direction.eq(Vector.Up)) {
    yMultiplier = 4;
  } else if (direction.eq(Vector.Left)) {
    yMultiplier = 6;
  } else if (direction.eq(Vector.Right)) {
    yMultiplier = 2;
  }

  return {
    tileX: TILE_X + WIDTH * currentFrame,
    tileY: TILE_Y + TILE_SIZE * yMultiplier,
  };
};

export const drawFrame = (
  ctx: CanvasRenderingContext2D,
  tileSet: CanvasImageSource,
  direction: Vector,
  currentFrame: number
) => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  const { tileX, tileY } = getSpritePos(direction, currentFrame);

  ctx.drawImage(tileSet, tileX, tileY, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
};

export const getInputVector = (key: string) => {
  if (Input.Up.includes(key)) {
    return Vector.Up;
  } else if (Input.Down.includes(key)) {
    return Vector.Down;
  } else if (Input.Left.includes(key)) {
    return Vector.Left;
  } else if (Input.Right.includes(key)) {
    return Vector.Right;
  }

  return Vector.Zero;
};

export const move = (direction: Vector, canvas: HTMLCanvasElement) => {
  if (direction.eq(Vector.Zero)) {
    return;
  }
  const velocity = direction.mul(SPEED);
  canvas.style.top = `${parseInt(canvas.style.top || "0") - velocity.x}px`;
  canvas.style.left = `${parseInt(canvas.style.left || "0") + velocity.y}px`;
};
