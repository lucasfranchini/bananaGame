import Game from "../classes/Game";

export default interface Dropable {
  updateState(game: Game): void;
  //drop(): void;
  draw(): void;
}
