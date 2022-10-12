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

  constructor(
    rect: Rect,
    type: ColliderType,
    onCollision?: (collider: Collider) => void
  ) {
    this.rect = rect;
    this.type = type;
    this.onCollision = () => (onCollision ? onCollision(this) : noop());
  }
}
