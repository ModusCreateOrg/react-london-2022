export class Rect {
  public x1: number;
  public y1: number;
  public x2: number;
  public y2: number;
  public width: number;
  public height: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    scaleX = 0,
    scaleY = 0
  ) {
    this.x1 = x - scaleX;
    this.y1 = y - scaleY;
    this.x2 = x + width + scaleX;
    this.y2 = y + height + scaleY;
    this.width = width;
    this.height = height;
  }

  public overlaps(r: Rect): boolean {
    return (
      this.x1 <= r.x2 && this.x2 >= r.x1 && this.y1 <= r.y2 && this.y2 >= r.y1
    );
  }

  public moveBy(dx: number, dy: number) {
    this.x1 += dx;
    this.y1 += dy;
    this.x2 = this.x1 + this.width;
    this.y2 = this.y1 + this.height;
  }

  public moveTo(x: number, y: number) {
    this.x1 = x;
    this.y1 = y;
    this.x2 = this.x1 + this.width;
    this.y2 = this.y1 + this.height;
  }

  public scale(scaleX: number, scaleY: number) {
    this.x1 -= scaleX;
    this.y1 -= scaleY;
    this.x2 = this.x1 + this.width + scaleX;
    this.y2 = this.y1 + this.height + scaleY;
  }
}
