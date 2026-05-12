// Q5. Implement preorder traversal.

const preorderTraversal = (root) => {
    let result = [];
    
    const traverse = (node) => {
        if (!node) return;
        result.push(node.val);
        traverse(node.left);
        traverse(node.right);
    };
    
    traverse(root);
    return result;
};
