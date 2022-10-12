export class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public mul(value: number) {
    return new Vector(this.x * value, this.y * value);
  }

  public eq({ x, y }: Vector): boolean {
    return this.x === x && this.y === y;
  }

  public static get Zero() {
    return new Vector(0, 0);
  }

  public static get Up() {
    return new Vector(0, -1);
  }

  public static get Down() {
    return new Vector(0, 1);
  }

  public static get Left() {
    return new Vector(-1, 0);
  }

  public static get Right() {
    return new Vector(1, 0);
  }
}
