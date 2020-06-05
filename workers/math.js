import {Port} from "../classes/port.js";

new Port(self, (message) => {
    return new Promise((resolve) => {
        let {a, b} = message.data;
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
        }

        setTimeout(resolve, 5000, result);
    });
});