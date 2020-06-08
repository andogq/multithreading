import {Port} from "./port";

export class Thread extends Port {
    worker: Worker;

    constructor(name: string, incomming: PortIncommingFunction) {
        let worker = new Worker(`/workers/${name}.js`, {type: "module"});

        super(worker, incomming);

        this.worker = worker;
    }

    init(data: any) {
        return this.send({
            type: "init",
            data
        });
    }
}