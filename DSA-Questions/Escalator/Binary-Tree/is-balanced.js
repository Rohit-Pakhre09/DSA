// 5. Check if a binary tree is balanced.

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

const isBalanced = (root) => {
    const checkHeight = (node) => {
        if (!node) return 0;

        let left = checkHeight(node.left);
        if (left === -1) return -1;

        let right = checkHeight(node.right);
        if (right === -1) return -1;

        if (Math.abs(left - right) > 1) return -1;

        return 1 + Math.max(left, right);
    }

    return checkHeight(root) !== -1;
}
