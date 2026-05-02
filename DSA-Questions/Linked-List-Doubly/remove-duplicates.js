// 5. Remove duplicates from a sorted doubly linked list.

class Node {
    constructor(val) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

const removeDuplicatesDoubly = (head) => {
    let curr = head;

    while (curr && curr.next) {
        if (curr.val === curr.next.val) {
            let dup = curr.next;
            curr.next = dup.next;
            if (dup.next) dup.next.prev = curr;
        } else {
            curr = curr.next;
        }
    }

    return head;
}

const printList = (head) => {
    let res = [];
    while (head) { res.push(head.val); head = head.next; }
}
