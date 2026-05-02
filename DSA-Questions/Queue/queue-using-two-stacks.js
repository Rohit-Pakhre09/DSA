// 2. Implement a queue using two stacks.

class QueueUsingStacks {
    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }

    enqueue(val) {
        this.stack1.push(val);
    }

    dequeue() {
        if (this.stack2.length === 0) {
            while (this.stack1.length) {
                this.stack2.push(this.stack1.pop());
            }
        }
        if (this.stack2.length === 0) return "Queue is empty";
        return this.stack2.pop();
    }

    front() {
        if (this.stack2.length === 0) {
            while (this.stack1.length) {
                this.stack2.push(this.stack1.pop());
            }
        }
        return this.stack2[this.stack2.length - 1];
    }

    isEmpty() {
        return this.stack1.length === 0 && this.stack2.length === 0;
    }
}
