import Dropable from "../interfaces/Dropables";
import Drops from "./Drops";
import Game from "./Game";

export default class Bomb extends Drops implements Dropable {
  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context, "/assets/bomb.png");
    this._speedY = 12;
  }
  updateState(game: Game) {
    this.move();
    if (this.isOutOfScreen()) {
      game.deleteDropable(this);
    }
    if (game.player.checkCollision(this) || game.player.checkLife()) {
      game.player.reduceLife(true);
      game.updateLife();
      game.end();
    }
  }
}
