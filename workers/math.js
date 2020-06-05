import {Port} from "../classes/port.js";

function incomming(message, object) {
    return new Promise((resolve) => {
        if (message.type == "transfer") {
            self.random = new Port(object, incomming);
            resolve();
        } else {
            Promise.all([
                self.random.send({type: "get"}),
                self.random.send({type: "get"})
            ]).then(([a, b]) => {
                let result;
                switch (message.type) {
                    case "multiply":
                        result = a * b;
                        break;
                    case "divide":
                        result = a / b;
                        break;
                    case "add":
                        result = a + b;
                        break;
                    case "divide":
                        result = a - b;
                        break;
                    case "transfer":
                        break;
                }
                setTimeout(resolve, 1000, {a, b, result});
            });
        }
    });
}

new Port(self, incomming);