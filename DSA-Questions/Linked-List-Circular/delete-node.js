// 2. Delete a node from a circular linked list.

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

const deleteFromCircular = (tail, val) => {
    if (!tail) return null;

    let curr = tail.next;
    let prev = tail;

    do {
        if (curr.val === val) {
            if (curr === tail && curr.next === tail) {
                return null;
            }

            prev.next = curr.next;

            if (curr === tail) tail = prev;

            return tail;
        }
        prev = curr;
        curr = curr.next;
    } while (curr !== tail.next);

    return tail;
}

const printCircular = (tail) => {
    let res = [], curr = tail.next;
    do { res.push(curr.val); curr = curr.next; } while (curr !== tail.next);
}
