// 4. Find all pairs with a given sum in a sorted doubly linked list.

class Node {
    constructor(val) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

const findPairsWithSum = (head, target) => {
    let tail = head;
    while (tail.next) tail = tail.next;

    let left = head;
    let right = tail;
    const pairs = [];

    while (left !== right && right.next !== left) {
        let sum = left.val + right.val;

        if (sum === target) {
            pairs.push([left.val, right.val]);
            left = left.next;
            right = right.prev;
        } else if (sum < target) {
            left = left.next;
        } else {
            right = right.prev;
        }
    }

    return pairs;
}
