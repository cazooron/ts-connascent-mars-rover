import {format} from "util";

export class Message {

    private x!: string;
    private y!: string;
    private commandsCount!: number;
    private direction!: string;
    private positionMessage: string;
    private commandsMessage: string;


    constructor(datagrams: Array<string>) {
        this.positionMessage = this.parsePosition(datagrams);
        this.commandsMessage = this.parseCommands(datagrams);
    }

    private parsePosition(datagrams: Array<string>) {
        for (let datagram of datagrams) {
            // Meaning
            if(datagram.startsWith("X"))
                this.x = datagram.substring(1);
            if(datagram.startsWith("Y"))
                this.y = datagram.substring(1);
            if(datagram.startsWith("D"))
                this.direction = datagram.substring(1);
            if(datagram.startsWith("M"))
                this.commandsCount = Number.parseInt(datagram.substring(1));
        }
        // Meaning here, 100,100?
        return format("100 100\n%s %s %s\n", this.x, this.y, this.direction);
    }

    public toString(): string {
        return format("%s%s", this.positionMessage, this.commandsMessage)
    }

    public isValid(): boolean {
        return this.x != undefined &&
            this.y != undefined &&
            this.direction != undefined &&
            this.commandsCount != undefined &&
            this.commandsMessage.length === this.commandsCount;
    }


    private parseCommands(datagrams: Array<string>) {
        // Is this a default?
        let commandMessage: string = "";
        // Commandnumber starts with 1 why?
        for (let commandNumber = 1; commandNumber <= this.commandsCount; commandNumber++) {
            for (let datagram of datagrams) {
                // Meaning -> Is common across repo to parse the datagram?
                    // Fix by moving datagram into it's own class with comparator
                if(datagram.startsWith(commandNumber.toString())) {
                    commandMessage += datagram.substring(1);
                }
            }
        }
        return commandMessage;
    }
}