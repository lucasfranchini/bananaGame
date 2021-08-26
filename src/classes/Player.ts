import Entity from "./Entity";

export default class Player extends Entity {
  private _maxLife: number;
  private _actualLife: number;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    initialX: number,
    initialY: number,
    initialLife: number
  ) {
    super(canvas, context, initialX, initialY, "/assets/alien.png", 64, 97);
    this._maxLife = initialLife;
    this._actualLife = initialLife;
    this._x -= 64;
    this._y -= 97;
  }
  updateState() {
    this.move();
    this.stopOnEdge();
  }
  startMove(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      this._speedX = 5;
    } else if (event.key === "ArrowLeft") {
      this._speedX = -5;
    }
  }
  endMove(event: KeyboardEvent) {
    if (event.key === "ArrowRight" && this._speedX === 5) {
      this._speedX = 0;
    }
    if (event.key === "ArrowLeft" && this._speedX === -5) {
      this._speedX = 0;
    }
  }
  stopOnEdge() {
    if (this._x < 0) {
      this._x = 0;
    }
    if (this._x + this._img.width > this._canvas.width) {
      this._x = this._canvas.width - this._img.width;
    }
  }
  checkColision(entity: Entity) {
    const playerCoordinates = {
      y: [this._y, this._y + this._img.height],
      x: [this._x, this._x + this._img.width],
    };
    const entityCoordinates = {
      y: [entity.y, entity.y + entity.img.height],
      x: [entity.x, entity.x + entity.img.width],
    };
  }
}
