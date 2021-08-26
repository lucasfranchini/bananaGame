export default class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  constructor(
    screenWidth: number,
    screenHeight: number,
    canvas: HTMLCanvasElement
  ) {
    this.canvas = canvas;
    this.canvas.width = screenWidth;
    this.canvas.height = screenHeight;
    this.context = canvas.getContext("2d");
  }
}
