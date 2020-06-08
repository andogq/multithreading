import {Queue} from "./queue";
import {Message} from "./message";

declare global {
    type PortIncommingFunction = (message: Message, object?: Transferable) => Promise<any>;
}

export class Port {
    queue: Queue<(data: any) => void>;

    constructor(public port: Worker | MessagePort, public incomming: PortIncommingFunction) {
        this.queue = new Queue();

        this.port.onmessage = (e) => {
            let message: Message = Message.fromEvent(e);
            let object: Transferable = e.ports ? e.ports[0] : undefined;

            if (message.type == "response" && this.queue.exists(message.id)) {
                this.queue.get(message.id)(message.data);
            } else if (typeof this.incomming == "function") {
                this.incomming(message, object).then((data: any) => {
                    this.send(message.respond(data));
                });
            } else console.error(`Uncaught message: ${JSON.stringify(message)}`);
        }
    }

    send(arg: {type: string, data?: any} | Message) {
        let message: Message;
        let out: Promise<any>;

        if (arg instanceof Message) {
            message = arg;

            out = Promise.resolve();
        } else {
            out = new Promise((resolve) => {
                let id = this.queue.add(resolve);

                message = new Message(arg.type, id, arg.data);
            });
        }

        this.port.postMessage(message);
        return out;
    }

    transfer(object: Transferable) {
        return new Promise((resolve) => {
            let id = this.queue.add(resolve);

            let message = new Message("transfer", id);

            this.port.postMessage(message, [object]);
        });
    }
}