// 5. Detect if a linked list is circular.

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

const isCircular = (head) => {
    if (!head) return false;

    let curr = head.next;

    while (curr && curr !== head) {
        curr = curr.next;
    }

    return curr === head;
}
