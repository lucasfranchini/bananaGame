export default abstract class Entity {
  protected _canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  protected _x: number;
  protected _y: number;
  protected _img: HTMLImageElement;
  protected _speedX: number;
  protected _speedY: number;
  abstract updateState(): void;
  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    initialX: number,
    initialY: number,
    imageURL: string,
    width: number,
    height: number
  ) {
    this.context = context;
    this._x = initialX;
    this._y = initialY;
    this._speedX = 0;
    this._speedY = 0;
    this._img = new Image(width, height);
    this._img.src = imageURL;
    this._canvas = canvas;
  }
  draw() {
    const imgWidth = this._img.width;
    const imgHeight = this._img.height;
    this.context.drawImage(
      this._img,
      this._x - imgWidth,
      this._y - imgHeight,
      imgWidth,
      imgHeight
    );
  }
  move() {
    this._x += this._speedX;
    this._y += this._speedY;
  }
}
