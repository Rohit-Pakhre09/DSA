// 1. Reverse a singly linked list.

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

const reverseLinkedList = (head) => {
    let prev = null;
    let curr = head;

    while (curr) {
        let nextNode = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextNode;
    }

    return prev;
}

const printList = (head) => {
    let result = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
}
