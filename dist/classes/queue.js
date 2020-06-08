export class Queue {
    constructor() {
        this.queue = {};
    }
    add(item) {
        let id;
        do {
            id = Math.floor(Math.random() * Math.pow(10, 6)).toString(16);
        } while (this.queue[id]);
        this.queue[id] = item;
        return id;
    }
    get(id) {
        return this.queue[id];
    }
    exists(id) {
        return this.queue.hasOwnProperty(id);
    }
}
