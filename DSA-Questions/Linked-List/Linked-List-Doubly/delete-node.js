// 2. Delete a node from a doubly linked list.

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

    insert(val) {
        let node = new Node(val);
        if (!this.head) { this.head = node; return; }
        let curr = this.head;
        while (curr.next) curr = curr.next;
        curr.next = node;
        node.prev = curr;
    }

    delete(val) {
        if (!this.head) return;

        let curr = this.head;

        while (curr && curr.val !== val) curr = curr.next;
        if (!curr) return;

        if (curr.prev) curr.prev.next = curr.next;
        else this.head = curr.next;

        if (curr.next) curr.next.prev = curr.prev;
    }

    print() {
        let res = [], curr = this.head;
        while (curr) { res.push(curr.val); curr = curr.next; }
    }
}
