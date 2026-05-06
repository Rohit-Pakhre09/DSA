// 4. Split a circular linked list into two halves.

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

const splitCircular = (head) => {
    let slow = head;
    let fast = head;

    while (fast.next !== head && fast.next.next !== head) {
        slow = slow.next;
        fast = fast.next.next;
    }

    if (fast.next.next === head) fast = fast.next;

    let head1 = head;
    let head2 = slow.next;

    fast.next = head2;
    slow.next = head1;

    return [head1, head2];
}

const printCircular = (head) => {
    let res = [], curr = head;
    do { res.push(curr.val); curr = curr.next; } while (curr !== head);
}
