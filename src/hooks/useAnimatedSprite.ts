import { useEffect } from "react";
import { SpriteProps } from "./useSprite";

type AnimatedSpriteProps = SpriteProps & {
  animationLength: number;
  animationSpeed: number;
};

export const useAnimatedSprite = (props: AnimatedSpriteProps) => {
  useEffect(() => {
    const ctx = props.canvasRef.current?.getContext("2d");
    let intervalId: number;

    if (!props.canvasRef.current || !ctx) {
      return;
    }

    props.canvasRef.current.style.left = `${props.left}px`;
    props.canvasRef.current.style.top = `${props.top}px`;

    const sprite = new Image();
    sprite.src = props.tileSet;
    sprite.onload = () => {
      let currentFrame = 0;

      intervalId = window.setInterval(() => {
        ctx.clearRect(0, 0, props.width, props.height);

        ctx.drawImage(
          sprite,
          props.tileX + props.width * currentFrame,
          props.tileY,
          props.width,
          props.height,
          0,
          0,
          props.width,
          props.height
        );

        currentFrame =
          currentFrame === props.animationLength ? 0 : currentFrame + 1;
      }, props.animationSpeed);
    };

    return () => {
      clearInterval(intervalId);
    };
  }, [props]);
};
