import {Thread} from "./classes/thread.js";

function init() {
    window.tunnel = new MessageChannel();

    window.math = new Thread("math");
    window.random = new Thread("random");

    window.random.init({
        max: 100,
        min: 1
    }).then(() => {
        Promise.all([
            window.math.transfer(window.tunnel.port1),
            window.random.transfer(window.tunnel.port2)
        ]).then(() => {
            window.math.send({type: "add"}).then(console.log);
        });
    });
}

init();