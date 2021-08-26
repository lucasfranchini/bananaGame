export default class Entity {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  img: HTMLImageElement;

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
}
