export class Queue {
    queue: object;

    constructor() {
        this.queue = {};
    }

    add(item: any): string {
        let id;

        do {
            id = Math.floor(Math.random() * Math.pow(10, 6)).toString(16);
        } while (this.queue[id]);

        this.queue[id] = item;

        return id;
    }

    get(id: string): any {
        return this.queue[id];
    }

    exists(id: string): boolean {
        return this.queue.hasOwnProperty(id);
    }
}