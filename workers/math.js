import {Port} from "../classes/port.js";

new Port(self, (message, response) => {
    return new Promise((resolve) => {
        let {a, b} = message.data;
        switch (message.type) {
            case "multiply":
                response.data = a * b;
                break;
            case "divide":
                response.data = a / b;
                break;
            case "add":
                response.data = a + b;
                break;
            case "divide":
                response.data = a - b;
                break;
        }

        setTimeout(resolve, 5000);
    });
});