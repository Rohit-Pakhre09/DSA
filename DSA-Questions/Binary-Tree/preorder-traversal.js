// 2. Implement preorder traversal.

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

const preorder = (root, result = []) => {
    if (!root) return result;
    result.push(root.val);
    preorder(root.left, result);
    preorder(root.right, result);
    return result;
}
