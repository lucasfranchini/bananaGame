import Game from "./classes/Game";

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const game = new Game(screenWidth, screenHeight, canvas);

game.start();
