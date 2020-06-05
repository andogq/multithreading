import {Port} from "./port.js";

class Thread extends Port {
    constructor(name, incomming) {
        let worker = new Worker(`/workers/${name}.js`, {type: "module"});

        super(worker, incomming);

        this.worker = worker;
    }
}

export {Thread};