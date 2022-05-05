import {TimerTask} from "./TimerTask";

export class Timer {

    private timeout!: NodeJS.Timer;


    schedule(task: TimerTask, millisecondsToWait: number): void {
        // Connescence of timing? -> The user is reliant on cancelling timeouts themselves / the
        // timer does not support a queue of tasks 
        this.timeout = setTimeout(function() {
            task.run();
        }, millisecondsToWait);
    }

    cancel(): void {
        clearTimeout(this.timeout);
    }
}