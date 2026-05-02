// 1. Implement inorder traversal (recursive and iterative).

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

const inorderRecursive = (root, result = []) => {
    if (!root) return result;
    inorderRecursive(root.left, result);
    result.push(root.val);
    inorderRecursive(root.right, result);
    return result;
}

const inorderIterative = (root) => {
    const result = [];
    const stack = [];
    let curr = root;

    while (curr || stack.length) {
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        result.push(curr.val);
        curr = curr.right;
    }

    return result;
}
