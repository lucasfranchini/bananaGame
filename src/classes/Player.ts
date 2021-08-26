import Entity from "./Entity";

export default class Player extends Entity {
  maxLife: number;
  actualLife: number;
  constructor(
    context: CanvasRenderingContext2D,
    initialX: number,
    initialY: number,
    initialLife: number
  ) {
    super(context, initialX, initialY, "/assets/alien.png", 64, 97);
    this.maxLife = initialLife;
    this.actualLife = initialLife;
  }
}
