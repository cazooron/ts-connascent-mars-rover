import { format } from "util";
import { Direction } from "./Direction";

export class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(direction: Direction): Coordinate {
    if (direction.equals(Direction.NORTH())) {
      return this.moveNorth();
    } else if (direction.equals(Direction.EAST())) {
      return this.moveEast();
    } else if (direction.equals(Direction.SOUTH())) {
      return this.moveSouth();
    } else if (direction.equals(Direction.WEST())) {
      return this.moveWest();
    }
    return this;
  }

  moveNorth(): Coordinate {
    return new Coordinate(this.x, this.y + 1);
  }

  moveEast(): Coordinate {
    return new Coordinate(this.x + 1, this.y);
  }

  moveSouth(): Coordinate {
    return new Coordinate(this.x, this.y - 1);
  }

  moveWest(): Coordinate {
    return new Coordinate(this.x - 1, this.y);
  }

  toString(): string {
    return format("%s %s", this.x, this.y);
  }

  static DEFAULT(): Coordinate {
    return new Coordinate(0, 0);
  }
}
