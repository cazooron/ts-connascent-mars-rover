import { Position } from "../model/Position";
import { ICommand } from "../commands/ICommand";
import { Direction } from "../model/Direction";
import { Coordinate } from "../model/Coordinate";

export class MarsRoverEngine {
  private position: Position = new Position(
    Coordinate.DEFAULT(),
    Direction.DEFAULT()
  );

  execute(commands: Array<ICommand>): void {
    for (let command of commands) {
      this.position = command.execute(this.position);
    }
  }
  getPosition(): Position {
    return this.position;
  }
}
