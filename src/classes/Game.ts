import Player from "./Player";

export default class Game {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _player: Player;
  private _gameIntervalId: number;
  private _score: number;
  constructor(
    screenWidth: number,
    screenHeight: number,
    canvas: HTMLCanvasElement
  ) {
    this._canvas = canvas;
    this._canvas.width = screenWidth;
    this._canvas.height = screenHeight;
    this._context = canvas.getContext("2d");
  }
  start() {
    this._player = new Player(
      this._context,
      this._canvas.width / 2,
      this._canvas.height - 25,
      4
    );
    this.updateScore(0);
  }
  updateScore(newScore: number) {
    const element = document.querySelector(".score") as HTMLElement;

    if (newScore - this._score > 0) {
      element.classList.add("highlight");
      setTimeout(() => element.classList.remove("highlight"), 100);
    }

    this._score = newScore;
    element.innerText = "Score: " + this._score.toFixed(1);
  }
  Loop() {}
}
