import {Queue} from "/classes/queue.js";
import {Message} from "/classes/message.js";

class Port {
    constructor(port, incomming) {
        this.port = port;
        this.incomming = incomming;

        this.queue = new Queue();

        this.port.onmessage = (e) => {
            let message = new Message(e);

            if (typeof this.incomming == "function") {
                switch (message.type) {
                    case "response":
                        if (this.queue.exists(message.id)) {
                            this.queue.get(message.id)(message);
                        }
                        break;
                    default:
                        let response = new Message({type: "response", id: message.id});
                        this.incomming(message, response).then(() => {
                            this.send(response);
                        });
                        break;
                }
            } else console.error(`Uncaught message: ${message}`);
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

                message = new Message({type: arg.type, id, data: arg.data});
            });
        }

        this.port.postMessage(message);
        return out;
    }
}

export {Port};