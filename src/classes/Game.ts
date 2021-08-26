import Dropable from "../interfaces/Dropables";
import Fruit from "./Fruit";
import Player from "./Player";

export default class Game {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _player: Player;
  private _gameIntervalId: number;
  private _dropableIntervalId: number;
  private _score: number;
  private _dropables: Dropable[];
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
      this._canvas,
      this._context,
      this._canvas.width / 2,
      this._canvas.height - 25,
      4
    );
    this._dropables = [];
    this.updateScore(0);
    clearInterval(this._gameIntervalId);
    clearInterval(this._dropableIntervalId);
    this._gameIntervalId = window.setInterval(() => this.loop(), 1000 / 60);
    this._dropableIntervalId = window.setInterval(
      () => this.spawnFruit(),
      1000
    );
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
  spawnFruit() {
    console.log(this._dropables);
    this._dropables.push(new Fruit(this._canvas, this._context));
  }
  loop() {
    this._player.updateState();
    this._dropables.forEach((dropable) => dropable.updateState(this));
    this.renderGame();
  }
  renderGame() {
    this.clearScreen();
    this._player.draw();
    this._dropables.forEach((dropable) => dropable.draw());
  }
  deleteDropable(dropable: Dropable) {
    this._dropables = this._dropables.filter((d) => d !== dropable);
  }
  clearScreen() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }
  onKeyDown(event: KeyboardEvent) {
    this._player.startMove(event);
  }
  onKeyUp(event: KeyboardEvent) {
    this._player.endMove(event);
  }
}
