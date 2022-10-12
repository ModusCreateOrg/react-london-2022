import { Vector } from ".";
import { WORLD_WIDTH, WORLD_HEIGHT } from "../constants";

export const getRandomPosition = (width: number, height: number) => {
  return new Vector(
    Math.random() * (WORLD_WIDTH - width + 1),
    Math.random() * (WORLD_HEIGHT - height + 1)
  );
};
