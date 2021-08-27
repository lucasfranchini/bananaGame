import Dropable from "../interfaces/Dropables";
import Entity from "./Entity";
import Game from "./Game";

export default class Fruit extends Entity implements Dropable {
  private _isBanana: boolean;
  private _points: number;
  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context, 0, 0, "/assets/orange.png", 65, 67);
    this._isBanana = false;
    this.chooseRandomFruit();
    this._x = this.generateRandomXPosition();
  }
  chooseRandomFruit() {
    const chance = Math.random();
    if (chance < 0.3) {
      this.generateFruit("/assets/orange.png", 65, false, 5, 5);
    } else if (chance < 0.6) {
      this.generateFruit("/assets/red-apple.png", 65, false, 8, 10);
    } else if (chance < 0.8) {
      this.generateFruit("/assets/watermelon.png", 82, false, 11, 20);
    } else if (chance < 0.95) {
      this.generateFruit("/assets/strawberry.png", 65, false, 14, 30);
    } else {
      this.generateFruit("/assets/banana.png", 61, true, 15, 1);
    }
  }
  generateFruit(
    img: string,
    width: number,
    isBanana: boolean,
    dropSpeed: number,
    points: number
  ) {
    this._img.src = img;
    this._img.width = width;
    this._isBanana = isBanana;
    this._speedY = dropSpeed;
    this._points = points;
  }
  generateRandomXPosition() {
    return Math.floor(Math.random() * (this._canvas.width - this._img.width));
  }
  updateState(game: Game) {
    this.move();
    if (this.isOutOfScreen()) {
      game.deleteDropable(this);
      game.player.reduceLife();
      game.updateLife();
    }
    if (game.player.checkLife()) {
      game.end();
    }
    if (game.player.checkCollision(this)) {
      this._isBanana
        ? game.updateScore(game.score * 2)
        : game.updateScore(game.score + this._points);
      game.deleteDropable(this);
    }
  }
  isOutOfScreen() {
    return this._y > this._canvas.height;
  }
}
