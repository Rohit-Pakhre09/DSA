// 1. Insert a node in a circular linked list.

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

const insertInCircular = (tail, val) => {
    let node = new Node(val);

    if (!tail) {
        node.next = node;
        return node;
    }

    node.next = tail.next;
    tail.next = node;
    return tail;
}

const printCircular = (tail) => {
    if (!tail) return;
    let res = [];
    let curr = tail.next;
    do {
        res.push(curr.val);
        curr = curr.next;
    } while (curr !== tail.next);
}
