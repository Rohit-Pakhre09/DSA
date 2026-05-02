// 4. Remove the nth node from the end.

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

const removeNthFromEnd = (head, n) => {
    let dummy = new Node(0);
    dummy.next = head;

    let fast = dummy;
    let slow = dummy;

    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }

    while (fast) {
        slow = slow.next;
        fast = fast.next;
    }

    slow.next = slow.next.next;
    return dummy.next;
}

const printList = (head) => {
    let res = [];
    while (head) { res.push(head.val); head = head.next; }
}
