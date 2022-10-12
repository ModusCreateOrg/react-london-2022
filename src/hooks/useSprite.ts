import { useEffect, RefObject } from "react";
import { TILE_SETS } from "../constants";

export type SpriteProps = {
  canvasRef: RefObject<HTMLCanvasElement>;
  tileSet: TILE_SETS;
  width: number;
  height: number;
  tileX: number;
  tileY: number;
  left?: number;
  top?: number;
};

export const useSprite = ({
  canvasRef,
  tileSet,
  width,
  height,
  tileX,
  tileY,
  left,
  top,
}: SpriteProps) => {
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (!canvasRef.current || !ctx) {
      return;
    }

    left && (canvasRef.current.style.left = `${left}px`);
    top && (canvasRef.current.style.top = `${top}px`);

    const sprite = new Image();
    sprite.src = tileSet;
    sprite.onload = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.drawImage(sprite, tileX, tileY, width, height, 0, 0, width, height);
    };
  }, [canvasRef, tileSet, width, height, tileX, tileY, left, top]);
};
