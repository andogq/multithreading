import {Port} from "../classes/port.js";

new Port(self, (message) => {
    return new Promise((resolve) => {
        switch (message.type) {
            case "init":
                self.max = message.data.max;
                self.min = message.data.min;
                resolve();
                break;
            case "get":
                let data = Math.floor(Math.random() * (self.max + self.min + 1)) - self.min;
                setTimeout(resolve, 5000, data);
                break;
        }
    });
});