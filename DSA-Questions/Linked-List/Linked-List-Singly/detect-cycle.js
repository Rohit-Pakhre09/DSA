// 2. Detect a cycle in a linked list.

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

const hasCycle = (head) => {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) return true;
    }

    return false;
}
