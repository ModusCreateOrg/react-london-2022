import { useEffect, RefObject } from "react";
import { TILE_SETS } from "../constants";

export type SpriteProps = {
  canvasRef: RefObject<HTMLCanvasElement>;
  tileSet: TILE_SETS;
  width: number;
  height: number;
  tileX: number;
  tileY: number;
  left: number;
  top: number;
};

export const useSprite = (props: SpriteProps) => {
  useEffect(() => {
    const ctx = props.canvasRef.current?.getContext("2d");

    if (!props.canvasRef.current || !ctx) {
      return;
    }

    props.canvasRef.current.style.left = `${props.left}px`;
    props.canvasRef.current.style.top = `${props.top}px`;

    const sprite = new Image();
    sprite.src = props.tileSet;
    sprite.onload = () => {
      ctx.clearRect(0, 0, props.width, props.height);

      ctx.drawImage(
        sprite,
        props.tileX,
        props.tileY,
        props.width,
        props.height,
        0,
        0,
        props.width,
        props.height
      );
    };
  }, [props]);
};
