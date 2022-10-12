import { Rect, noop } from "./";

export enum ColliderType {
  Health,
  Bonus,
  Damage,
}

export class Collider {
  public readonly rect: Rect;
  public readonly type: ColliderType;
  public readonly onCollision: () => void;
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
