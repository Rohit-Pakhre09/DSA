// 3. Traverse a circular linked list.

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

const traverseCircular = (head) => {
    if (!head) return;

    let curr = head;
    const result = [];

    do {
        result.push(curr.val);
        curr = curr.next;
    } while (curr !== head);

}
