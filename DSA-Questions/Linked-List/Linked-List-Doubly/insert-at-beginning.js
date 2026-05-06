// 1. Insert a node at the beginning of a doubly linked list.

class Node {
    constructor(val) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
    }

    insertAtBeginning(val) {
        let node = new Node(val);
        if (!this.head) {
            this.head = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    print() {
        let res = [], curr = this.head;
        while (curr) { res.push(curr.val); curr = curr.next; }
    }
}
