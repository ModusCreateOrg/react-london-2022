import { Rect, noop } from "./";
import { AnyFunction } from "../types";

export enum ColliderType {
  Health,
  Bonus,
  Damage,
  Object,
}

export class Collider {
  public readonly rect: Rect;
  public readonly type: ColliderType;
  public readonly onCollision: AnyFunction;
  private ignoreCollisions = false;

  constructor(
    rect: Rect,
    type: ColliderType,
    onCollision?: (collider: Collider) => void
  ) {
    this.rect = rect;
    this.type = type;
    this.onCollision = () => (onCollision ? onCollision(this) : noop());
  }

  public is(type: ColliderType) {
    return !this.ignoreCollisions && this.type === type;
  }

  public hide() {
    this.ignoreCollisions = true;
  }

  public show() {
    this.ignoreCollisions = false;
  }
}
