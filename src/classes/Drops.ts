import Dropable from "../interfaces/Dropables";
import Entity from "./Entity";
import Game from "./Game";

export default abstract class Drops extends Entity implements Dropable {
  abstract updateState(game: Game): void;
  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    imgURL: string
  ) {
    super(canvas, context, 0, 0, imgURL, 67, 67);
    this._x = this.generateRandomXPosition();
  }

  generateRandomXPosition() {
    return Math.floor(Math.random() * (this._canvas.width - this._img.width));
  }
  isOutOfScreen() {
    return this._y > this._canvas.height - 25;
  }
}
