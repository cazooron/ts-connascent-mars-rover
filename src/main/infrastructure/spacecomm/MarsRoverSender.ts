import {ISendNotifications} from "../ISendNotifications";
import {ISendFinalStateBus} from "../bus/ISendFinalStateBus";
import {INasaAntenna} from "./INasaAntenna";

export class MarsRoverSender implements ISendNotifications {

    private nasaAntenna: INasaAntenna;


    constructor(nasaAntenna: INasaAntenna) {
        this.nasaAntenna = nasaAntenna;
    }

    readsFrom(marsRoverServiceBus: ISendFinalStateBus): void {
        marsRoverServiceBus.trigger(this);
    }

    send(message: string): void {
        let messageParts: string[] = message.split(" ");
        // Position + Meaning connascence, assuming message has an order
        // Fix by instantiating message into a class
        this.nasaAntenna.received([
            "X" + messageParts[0],
            "Y" + messageParts[1],
            "D" + messageParts[2]
        ])
    }

    sendError(): void {
        // Meaning -> ER could be in a const somewhere
        this.nasaAntenna.received(["ER"])
    }

}