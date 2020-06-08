export class Message {
    constructor(public type: string, public id: string, public data?: any) {}

    respond(data: any) {
        return new Message("response", this.id, data);
    }

    static fromEvent(e: MessageEvent) {
        let data = e.data;
        return new Message(data.type, data.id, data.data);
    }
}