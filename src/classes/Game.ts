import Player from "./Player";

export default class Game {
  private _canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  player: Player;
  constructor(
    screenWidth: number,
    screenHeight: number,
    canvas: HTMLCanvasElement
  ) {
    this._canvas = canvas;
    this._canvas.width = screenWidth;
    this._canvas.height = screenHeight;
    this.context = canvas.getContext("2d");
    this.player = new Player(this.context, screenWidth / 2, screenHeight - 25);
  }
  start() {
    this.player.draw();
  }
}
