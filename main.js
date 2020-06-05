import {Port} from "/classes/port.js";

function init() {
    let channel = new MessageChannel();

    window.p1 = new Port(channel.port1, (message, response) => {
        return new Promise((resolve) => {
            console.log(`p1: Incomming message: ${message}`);
            response.data = "p1 Yeet";
            resolve();
        });
    });
    window.p2 = new Port(channel.port2, (message, response) => {
        return new Promise((resolve) => {
            console.log(`p2: Incomming message: ${message}`);
            response.data = "p2 Yeet";
            resolve();
        });
    });
}

init();