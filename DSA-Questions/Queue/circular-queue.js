// 4. Implement a circular queue.

class CircularQueue {
    constructor(size) {
        this.size = size;
        this.queue = new Array(size);
        this.front = -1;
        this.rear = -1;
    }

    isFull() {
        return (this.rear + 1) % this.size === this.front;
    }

    isEmpty() {
        return this.front === -1;
    }

    enqueue(val) {
        if (this.isFull()) return "Queue is full";

        if (this.isEmpty()) this.front = 0;
        this.rear = (this.rear + 1) % this.size;
        this.queue[this.rear] = val;
    }

    dequeue() {
        if (this.isEmpty()) return "Queue is empty";

        let val = this.queue[this.front];

        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.size;
        }

        return val;
    }

    peek() {
        if (this.isEmpty()) return "Queue is empty";
        return this.queue[this.front];
    }
}
