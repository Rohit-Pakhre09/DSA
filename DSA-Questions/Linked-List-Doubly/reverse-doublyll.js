// 3. Reverse a doubly linked list.

class Node {
    constructor(val) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

const reverseDoublyLL = (head) => {
    let curr = head;
    let temp = null;

    while (curr) {
        temp = curr.prev;
        curr.prev = curr.next;
        curr.next = temp;
        curr = curr.prev;
    }

    if (temp) head = temp.prev;
    return head;
}

const printList = (head) => {
    let res = [];
    while (head) { res.push(head.val); head = head.next; }
}
