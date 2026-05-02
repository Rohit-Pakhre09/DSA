// 3. Find the middle of a linked list.

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

const findMiddle = (head) => {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow.val;
}
