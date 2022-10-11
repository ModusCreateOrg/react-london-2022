export enum GAME_STATES {
  Game,
  GameOver,
}

export enum TILE_SETS {
  Player = "assets/character.png",
  Npc = "assets/npc.png",
  Objects = "assets/objects.png",
  World = "assets/overworld.png",
}

export const TILE_SIZE = 32;
export const WORLD_WIDTH = 2048;
export const WORLD_HEIGHT = 1536;

export const MAX_HEALTH = 4;
export const MIN_HEALTH = 0;
