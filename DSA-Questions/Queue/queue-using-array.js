// 1. Implement a queue using an array.

class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(val) {
        this.items.push(val);
    }

    dequeue() {
        if (this.isEmpty()) return "Queue is empty";
        return this.items.shift();
    }

    front() {
        if (this.isEmpty()) return "Queue is empty";
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}
