import {Port} from "../classes/port.js";

function incomming(message, object) {
    return new Promise((resolve) => {
        switch (message.type) {
            case "init":
                self.max = message.data.max;
                self.min = message.data.min;
                console.log("[random] Initialised");
                resolve();
                break;
            case "transfer":
                new Port(object, incomming);
                console.log("[random] Port transferred");
                resolve();
                break;
            case "get":
                let data = Math.floor(Math.random() * (self.max + self.min + 1)) - self.min;
                console.log("[random] Number retrieved");
                setTimeout(resolve, 1000, data);
                break;
        }
    });
}

new Port(self, incomming);