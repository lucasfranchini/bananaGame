import Dropable from "../interfaces/Dropables";
import Bomb from "./Bomb";
import Fruit from "./Fruit";
import Player from "./Player";

export default class Game {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _player: Player;
  private _gameIntervalId: number;
  private _fruitsIntervalId: number;
  private _bombsIntervalId: number;
  private _difficultIntervalId: number;
  private _difficult: number;
  score: number;
  private _dropables: Dropable[];
  constructor(screenWidth: number, screenHeight: number, canvas: HTMLCanvasElement) {
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
    this._difficult = 1;
    this.scoreInHeader();
    this.updateScore(0);
    this.updateLife();
    this.clearIntervals();
    this._gameIntervalId = window.setInterval(() => this.loop(), 1000 / 60);
    this._fruitsIntervalId = window.setInterval(() => this.spawnFruit(), 1000);
    this._bombsIntervalId = window.setInterval(() => this.spawnBomb(), 2000);
    this._difficultIntervalId = window.setInterval(() => this.increaseDificult(), 5000);
  }
  updateScore(newScore: number) {
    const element = document.querySelector(".score") as HTMLElement;

    if (newScore - this.score > 0) {
      element.classList.add("highlight");
      setTimeout(() => element.classList.remove("highlight"), 100);
    }

    this.score = newScore;
    element.innerText = "Score: " + this.score;
  }
  updateLife() {
    const element = document.querySelector(".lifes") as HTMLElement;
    element.innerHTML = "";

    for (let i = 0; i < this.player.maxLife; i++) {
      const life = new Image(40, 40);
      if (i >= this.player.actualLife) life.src = "/assets/heart-empty.png";
      else life.src = "/assets/heart.png";
      element.appendChild(life);
    }
  }
  spawnFruit() {
    this._dropables.push(new Fruit(this._canvas, this._context));
  }
  spawnBomb() {
    this._dropables.push(new Bomb(this._canvas, this._context));
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
  increaseDificult() {
    if (this._difficult < 3) this._difficult += 0.5;
    clearInterval(this._fruitsIntervalId);
    console.log(this._difficult);
    this._fruitsIntervalId = window.setInterval(() => this.spawnFruit(), 1000 / this._difficult);
  }
  deleteDropable(dropable: Dropable) {
    this._dropables = this._dropables.filter((d) => d !== dropable);
  }
  clearScreen() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") return this.start();
    this._player.startMove(event);
  }
  onKeyUp(event: KeyboardEvent) {
    this._player.endMove(event);
  }
  end() {
    this._dropables = [];
    this.clearIntervals();
    this.scoreCentered();
  }
  scoreCentered() {
    const element = document.querySelector(".score") as HTMLElement;
    element.classList.add("End");
    const finishText = document.createElement("span");
    finishText.innerText = "Press Enter to restart";
    element.appendChild(finishText);
  }
  scoreInHeader() {
    const element = document.querySelector(".score") as HTMLElement;
    element.classList.remove("End");
  }
  clearIntervals() {
    clearInterval(this._gameIntervalId);
    clearInterval(this._fruitsIntervalId);
    clearInterval(this._bombsIntervalId);
    clearInterval(this._difficultIntervalId);
  }
  get player() {
    return this._player;
  }
}
