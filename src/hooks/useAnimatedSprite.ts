import { useEffect } from "react";
import { SpriteProps } from "./useSprite";

type AnimatedSpriteProps = SpriteProps & {
  animationLength: number;
  animationSpeed: number;
};

export const useAnimatedSprite = ({
  canvasRef,
  tileSet,
  animationSpeed,
  animationLength,
  width,
  height,
  tileX,
  tileY,
  left,
  top,
}: AnimatedSpriteProps) => {
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    let intervalId: number;

    if (!canvasRef.current || !ctx) {
      return;
    }

    left && (canvasRef.current.style.left = `${left}px`);
    top && (canvasRef.current.style.top = `${top}px`);

    const sprite = new Image();
    sprite.src = tileSet;
    sprite.onload = () => {
      let currentFrame = 0;

      intervalId = window.setInterval(() => {
        ctx.clearRect(0, 0, width, height);

        ctx.drawImage(
          sprite,
          tileX + width * currentFrame,
          tileY,
          width,
          height,
          0,
          0,
          width,
          height
        );

        currentFrame = currentFrame === animationLength ? 0 : currentFrame + 1;
      }, animationSpeed);
    };

    return () => {
      clearInterval(intervalId);
    };
  }, [
    canvasRef,
    tileSet,
    animationSpeed,
    animationLength,
    width,
    height,
    tileX,
    tileY,
    left,
    top,
  ]);
};
