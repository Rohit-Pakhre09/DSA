// 2. Implement a deque using a doubly linked list.

class Node {
    constructor(val) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class Deque {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    addFront(val) {
        let node = new Node(val);
        if (!this.head) {
            this.head = this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
        this.length++;
    }

    addRear(val) {
        let node = new Node(val);
        if (!this.tail) {
            this.head = this.tail = node;
        } else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }

    removeFront() {
        if (!this.head) return "Deque is empty";
        let val = this.head.val;
        this.head = this.head.next;
        if (this.head) this.head.prev = null;
        else this.tail = null;
        this.length--;
        return val;
    }

    removeRear() {
        if (!this.tail) return "Deque is empty";
        let val = this.tail.val;
        this.tail = this.tail.prev;
        if (this.tail) this.tail.next = null;
        else this.head = null;
        this.length--;
        return val;
    }

    isEmpty() {
        return this.length === 0;
    }
}
