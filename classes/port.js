import {Queue} from "./queue.js";
import {Message} from "./message.js";

class Port {
    constructor(port, incomming) {
        this.port = port;
        this.incomming = incomming;

        this.queue = new Queue();

        this.port.onmessage = (e) => {
            let message = Message.fromEvent(e);
            let object = e.ports ? e.ports[0] : undefined;

            if (message.type == "response" && this.queue.exists(message.id)) {
                this.queue.get(message.id)(message.data);
            } else if (typeof this.incomming == "function") {
                this.incomming(message, object).then((data) => {
                    this.send(message.respond(data));
                });
            } else console.error(`Uncaught message: ${JSON.stringify(message)}`);
        }
    }

    send(arg = {}) {
        let message;
        let out;
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

    transfer(object) {
        return new Promise((resolve) => {
            let id = this.queue.add(resolve);

            let message = new Message("transfer", id);

            this.port.postMessage(message, [object]);
        });
    }
}

export {Port};