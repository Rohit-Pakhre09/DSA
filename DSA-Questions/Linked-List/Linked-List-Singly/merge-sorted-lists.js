// 5. Merge two sorted linked lists.

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

const mergeSortedLists = (l1, l2) => {
    let dummy = new Node(0);
    let curr = dummy;

    while (l1 && l2) {
        if (l1.val <= l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }

    curr.next = l1 || l2;

    return dummy.next;
}

const printList = (head) => {
    let res = [];
    while (head) { res.push(head.val); head = head.next; }
}
