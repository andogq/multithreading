import {Thread} from "./classes/thread.js";

function init() {
    window.m = new Thread("math");
    window.r = new Thread("random");

    window.r.init({max: 100, min: 1}).then(() => {
        window.r.send({type: "get", data: {
            max: 100,
            min: 1
        }}).then(console.log);
    });
}

init();