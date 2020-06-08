export class Queue<T> {
    queue: {[index: string]: T};

    constructor() {
        this.queue = {};
    }

    add(item: T): string {
        let id;

        do {
            id = Math.floor(Math.random() * Math.pow(10, 6)).toString(16);
        } while (this.queue[id]);

        this.queue[id] = item;

        return id;
    }

    get(id: string): T {
        return this.queue[id];
    }

    exists(id: string): boolean {
        return this.queue.hasOwnProperty(id);
    }
}