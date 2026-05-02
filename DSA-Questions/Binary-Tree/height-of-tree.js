// 4. Find the height of a binary tree.

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

const heightOfTree = (root) => {
    if (!root) return 0;

    let leftHeight = heightOfTree(root.left);
    let rightHeight = heightOfTree(root.right);

    return 1 + Math.max(leftHeight, rightHeight);
}
