// 1. Implement a deque using an array.

class Deque {
    constructor() {
        this.items = [];
    }

    addFront(val) {
        this.items.unshift(val);
    }

    addRear(val) {
        this.items.push(val);
    }

    removeFront() {
        if (this.isEmpty()) return "Deque is empty";
        return this.items.shift();
    }

    removeRear() {
        if (this.isEmpty()) return "Deque is empty";
        return this.items.pop();
    }

    peekFront() {
        return this.items[0];
    }

    peekRear() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}
