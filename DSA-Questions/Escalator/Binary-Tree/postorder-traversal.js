// 3. Implement postorder traversal.

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

const postorder = (root, result = []) => {
    if (!root) return result;
    postorder(root.left, result);
    postorder(root.right, result);
    result.push(root.val);
    return result;
}
