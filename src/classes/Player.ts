import Entity from "./Entity";

export default class Player extends Entity {
  private _maxLife: number;
  private _actualLife: number;

  constructor(
    context: CanvasRenderingContext2D,
    initialX: number,
    initialY: number,
    initialLife: number
  ) {
    super(context, initialX, initialY, "/assets/alien.png", 64, 97);
    this._maxLife = initialLife;
    this._actualLife = initialLife;
  }
  startMove(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      this.SpeedX = 5;
    } else if (event.key === "ArrowLeft") {
      this.SpeedX = -5;
    }
  }
  endMove(event: KeyboardEvent) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      this.SpeedX = 0;
    }
  }
}
