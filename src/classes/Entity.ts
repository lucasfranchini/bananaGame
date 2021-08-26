export default class Entity {
  private context: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private img: HTMLImageElement;
  private _speedX: number;
  private _speedY: number;

  constructor(
    context: CanvasRenderingContext2D,
    initialX: number,
    initialY: number,
    imageURL: string,
    width: number,
    height: number
  ) {
    this.context = context;
    this.x = initialX;
    this.y = initialY;
    this._speedX = 0;
    this._speedY = 0;
    this.img = new Image(width, height);
    this.img.src = imageURL;
  }
  draw() {
    const imgWidth = this.img.width;
    const imgHeight = this.img.height;
    this.context.drawImage(
      this.img,
      this.x - imgWidth,
      this.y - imgHeight,
      imgWidth,
      imgHeight
    );
  }
  move() {
    this.x += this._speedX;
    this.y += this._speedY;
  }

  set SpeedX(newSpeed: number) {
    this._speedX = newSpeed;
  }
}
