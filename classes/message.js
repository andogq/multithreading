class Message {
    constructor(arg = {}) {
        if (arg instanceof Event) {
            // Event has been passed
            let e = arg.data;

            this.type = e.type;
            this.data = e.data;
            this.id = e.id;
        } else {
            // New message being created
            this.type = arg.type;
            this.data = arg.data;
            this.id = arg.id;
        }
    }
}

export {Message};