// 2. Implement a stack using a linked list.

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.top = null;
        this.length = 0;
    }

    push(val) {
        let node = new Node(val);
        node.next = this.top;
        this.top = node;
        this.length++;
    }

    pop() {
        if (!this.top) return "Stack is empty";
        let val = this.top.val;
        this.top = this.top.next;
        this.length--;
        return val;
    }

    peek() {
        return this.top ? this.top.val : "Stack is empty";
    }

    isEmpty() {
        return this.length === 0;
    }
}
