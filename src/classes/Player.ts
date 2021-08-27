import Coordinates from "../interfaces/Coordinates";
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
      this._speedX = 15;
    } else if (event.key === "ArrowLeft") {
      this._speedX = -15;
    }
  }
  endMove(event: KeyboardEvent) {
    if (event.key === "ArrowRight" && this._speedX > 0) {
      this._speedX = 0;
    }
    if (event.key === "ArrowLeft" && this._speedX < 0) {
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
  checkCollision(entity: Entity) {
    const playerCoordinates: Coordinates = {
      y: [this._y, this._y + this._img.height],
      x: [this._x, this._x + this._img.width],
    };
    const entityCoordinates: Coordinates = {
      y: [entity.y, entity.y + entity.img.height],
      x: [entity.x, entity.x + entity.img.width],
    };
    return (
      this.collisionOnLeft(playerCoordinates, entityCoordinates) ||
      this.collisionOnRight(playerCoordinates, entityCoordinates) ||
      this.collisionOnCenter(playerCoordinates, entityCoordinates)
    );
  }
  collisionOnRight(
    playerCoordinates: Coordinates,
    entityCoordinates: Coordinates
  ) {
    return (
      entityCoordinates.x[0] > playerCoordinates.x[0] &&
      entityCoordinates.x[0] < playerCoordinates.x[1] &&
      entityCoordinates.y[1] > playerCoordinates.y[0]
    );
  }
  collisionOnLeft(
    playerCoordinates: Coordinates,
    entityCoordinates: Coordinates
  ) {
    return (
      entityCoordinates.x[1] > playerCoordinates.x[0] &&
      entityCoordinates.x[1] < playerCoordinates.x[1] &&
      entityCoordinates.y[1] > playerCoordinates.y[0]
    );
  }
  collisionOnCenter(
    playerCoordinates: Coordinates,
    entityCoordinates: Coordinates
  ) {
    return (
      entityCoordinates.x[0] < playerCoordinates.x[0] &&
      entityCoordinates.x[1] > playerCoordinates.x[1] &&
      entityCoordinates.y[1] > playerCoordinates.y[0]
    );
  }
  reduceLife() {
    this._actualLife--;
  }
  checkLife() {
    return this.actualLife === 0;
  }
  get maxLife() {
    return this._maxLife;
  }
  get actualLife() {
    return this._actualLife;
  }
}
