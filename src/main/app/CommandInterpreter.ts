import { Direction } from "../model/Direction";
import { ICommand } from "../commands/ICommand";
import { TurnLeftCommand } from "../commands/TurnLeftCommand";
import { MoveForwardCommand } from "../commands/MoveForwardCommand";
import { TurnRightCommand } from "../commands/TurnRightCommand";
import { InitializationCommand } from "../commands/InitializationCommand";
import { Coordinate } from "../model/Coordinate";
import { Position } from "../model/Position";
import { StartingPositionCommand } from "../commands/StartingPositionCommand";

export class CommandInterpreter {
  private letterToDirection: Map<string, Direction> = new Map([
    // Meaning -> N is shared across repo
    ["N", Direction.NORTH()],
    ["E", Direction.EAST()],
    ["S", Direction.SOUTH()],
    ["W", Direction.WEST()],
  ]);

  translate(commands: string): Array<ICommand> {
    let allCommands = new Array<ICommand>();
    // Execution -> of these pushes can break the tests
    allCommands.push(this.getInitializationCommand(commands));
    allCommands.push(this.getStartingPositionCommand(commands));
    allCommands.push(...this.getMovementCommands(commands));

    return allCommands;
  }

  private getMovementCommands(commands: string): ICommand[] {
    let movementCommands = new Array<ICommand>();
    let lines: string[] = commands.split("\n");
    // Meaning -> We are assuming line 3 is the point to listen to commands
    for (let command of Array.from(lines[2])) {
      switch (command) {
        case "L":
          movementCommands.push(new TurnLeftCommand());
          break;
        case "F":
          movementCommands.push(new MoveForwardCommand());
          break;
        case "R":
          movementCommands.push(new TurnRightCommand());
          break;
      }
    }
    return movementCommands;
  }

  private getInitializationCommand(commands: string): InitializationCommand {
    // Meaning -> Assumption on line position is made
    let lines: string[] = commands.split("\n");
    let topRight: string[] = lines[0].split(" ");
    return new InitializationCommand(
      new Coordinate(parseInt(topRight[0]), parseInt(topRight[1]))
    );
  }

  private getStartingPositionCommand(
    commands: string
  ): StartingPositionCommand {
    let lines: string[] = commands.split("\n");
    // Meaning -> Assumption on line position is made
    let coords: string[] = lines[1].split(" ");

    let coordinate: Coordinate = new Coordinate(
      parseInt(coords[0]),
      parseInt(coords[1])
    );
    // Position -> Assuming that the direction of the initial position is the last letter
    let direction: Direction = <Direction>this.letterToDirection.get(coords[2]);
    let position: Position = new Position(coordinate, direction);
    return new StartingPositionCommand(position);
  }
}
