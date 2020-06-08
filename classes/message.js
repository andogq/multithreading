export class Message {
    constructor(type, id, data) {
        this.type = type;
        this.id = id;
        this.data = data;
    }
    respond(data) {
        return new Message("response", this.id, data);
    }
    static fromEvent(e) {
        let data = e.data;
        return new Message(data.type, data.id, data.data);
    }
}
