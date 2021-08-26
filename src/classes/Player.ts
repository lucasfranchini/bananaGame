import Entity from "./Entity";

export default class Player extends Entity {
  constructor(
    context: CanvasRenderingContext2D,
    initialX: number,
    initialY: number
  ) {
    super(context, initialX, initialY, "/assets/alien.png", 64, 97);
  }
}
