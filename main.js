import {Thread} from "./classes/thread.js";

function init() {
    window.t = new Thread("math");

    window.t.send({type: "add", data: {a: 10, b: 11}}).then(console.log);
}

init();