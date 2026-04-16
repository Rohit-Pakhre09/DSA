# 07 — Trees (Binary Tree, BST, AVL)

> **Hierarchical data structures that model relationships — used everywhere from file systems to databases.**

---

## 📖 Definition

A **Tree** is a hierarchical, non-linear data structure with:

- One **root** node (no parent)
- Every node has zero or more **children**
- No cycles (it's an acyclic graph)
- Any node can be reached from root via exactly one path

---

## 🖼️ Tree Anatomy

```
                    ┌───┐
                    │ 1 │ ← Root (level 0, depth 0)
                    └─┬─┘
           ┌──────────┴──────────┐
         ┌─┴─┐                 ┌─┴─┐
         │ 2 │                 │ 3 │ ← level 1
         └─┬─┘                 └─┬─┘
      ┌────┴────┐           ┌────┴────┐
    ┌─┴─┐     ┌─┴─┐       ┌─┴─┐     ┌─┴─┐
    │ 4 │     │ 5 │       │ 6 │     │ 7 │ ← level 2 (leaves)
    └───┘     └───┘       └───┘     └───┘

Terminology:
──────────────────────────────────────────────────────
Root:         Node 1 (the top, no parent)
Parent:       Node 2 is parent of 4 and 5
Child:        4, 5 are children of 2
Sibling:      4 and 5 are siblings
Leaf:         Nodes 4,5,6,7 (no children)
Edge:         Connection between two nodes (6 total)
Depth:        Distance from root (root=0, node 4 depth=2)
Height:       Longest path from node to leaf (root height=2)
Level:        All nodes at same depth (level 1 = {2,3})
Subtree:      Node 2 + its descendants = {2,4,5}
```

---

## 📖 Binary Tree

A **Binary Tree** is a tree where each node has **at most 2 children** (left and right).

```
Types of Binary Trees:

Full Binary Tree          Complete Binary Tree       Perfect Binary Tree
(every node has 0 or 2)  (all levels full except    (all levels completely full)
                          last, filled left to right)
      1                         1                         1
    /   \                     /   \                     /   \
   2     3                   2     3                   2     3
  / \                       / \   /                  / \   / \
 4   5                     4   5 6                  4   5 6   7
```

### Node & Tree Class

```javascript
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// Build a tree manually:
//        1
//       / \
//      2   3
//     / \
//    4   5
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
```

---

## 🔥 Tree Traversals

```
         1
       /   \
      2     3
     / \     \
    4   5     6

DFS Traversals:
─────────────────────────────────────────────────
Pre-order  (Root, Left, Right): 1 → 2 → 4 → 5 → 3 → 6
In-order   (Left, Root, Right): 4 → 2 → 5 → 1 → 3 → 6
Post-order (Left, Right, Root): 4 → 5 → 2 → 6 → 3 → 1

BFS (Level-order):
─────────────────────────────────────────────────
Level 0: 1
Level 1: 2, 3
Level 2: 4, 5, 6
Output: [1, 2, 3, 4, 5, 6]
```

```javascript
// Pre-order — Recursive — O(n)
function preorder(root) {
  if (!root) return [];
  return [root.val, ...preorder(root.left), ...preorder(root.right)];
}

// In-order — Recursive — O(n)
function inorder(root) {
  if (!root) return [];
  return [...inorder(root.left), root.val, ...inorder(root.right)];
}

// Post-order — Recursive — O(n)
function postorder(root) {
  if (!root) return [];
  return [...postorder(root.left), ...postorder(root.right), root.val];
}

// Pre-order — Iterative (using Stack)
function preorderIterative(root) {
  if (!root) return [];
  const result = [],
    stack = [root];
  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);
    // Push right first so left is processed first
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return result;
}

// In-order — Iterative
function inorderIterative(root) {
  const result = [],
    stack = [];
  let current = root;
  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left; // go as far left as possible
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right; // now explore right subtree
  }
  return result;
}

// Level-order (BFS) — Using Queue
function levelOrder(root) {
  if (!root) return [];
  const result = [],
    queue = [root];
  while (queue.length) {
    const level = [];
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
```

---

## 📖 Binary Search Tree (BST)

A **BST** is a Binary Tree where:

- Left subtree: all values **< root**
- Right subtree: all values **> root**
- Both subtrees are also BSTs

```
Valid BST:              Invalid BST:
      8                       5
    /   \                   /   \
   3    10                 4     6
  / \     \               / \
 1   6    14             3   7  ← 7 > 5, should be in right of 5!
    / \
   4   7

In-order traversal of BST always gives SORTED output:
For the valid BST: 1, 3, 4, 6, 7, 8, 10, 14  ← ascending ✅
```

### BST Implementation

```javascript
class BST {
  constructor() {
    this.root = null;
  }

  // Insert — O(h) where h = height (O(log n) balanced, O(n) worst)
  insert(val) {
    const node = new TreeNode(val);
    if (!this.root) {
      this.root = node;
      return;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = node;
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = node;
          break;
        }
        current = current.right;
      }
    }
  }

  // Search — O(h)
  search(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return true;
      current = val < current.val ? current.left : current.right;
    }
    return false;
  }

  // Delete — O(h) — 3 cases
  delete(val, node = this.root, parent = null) {
    if (!node) return; // not found

    if (val < node.val) {
      this.delete(val, node.left, node);
    } else if (val > node.val) {
      this.delete(val, node.right, node);
    } else {
      // Found! Three cases:
      if (node.left && node.right) {
        // Case 3: Two children — replace with in-order successor
        // In-order successor = smallest in right subtree
        let successor = node.right;
        while (successor.left) successor = successor.left;
        node.val = successor.val; // replace value
        this.delete(successor.val, node.right, node); // delete successor
      } else {
        // Case 1 or 2: 0 or 1 child
        const child = node.left || node.right;
        if (!parent) {
          this.root = child;
        } else if (parent.left === node) {
          parent.left = child;
        } else {
          parent.right = child;
        }
      }
    }
  }

  // Find min (leftmost node)
  findMin(node = this.root) {
    while (node.left) node = node.left;
    return node.val;
  }

  // Find max (rightmost node)
  findMax(node = this.root) {
    while (node.right) node = node.right;
    return node.val;
  }
}
```

### BST Complexity

```
Operation   | Average (balanced) | Worst (skewed)
────────────┼────────────────────┼───────────────
Search      |  O(log n)          |  O(n)
Insert      |  O(log n)          |  O(n)
Delete      |  O(log n)          |  O(n)

Worst case: Inserting sorted data [1,2,3,4,5] into BST
Creates a right-skewed "vine" — just a linked list!

1
 \
  2
   \
    3  ← height = n, all ops become O(n)
```

---

## 📖 AVL Tree (Self-Balancing BST)

An **AVL Tree** maintains a **balance factor** of -1, 0, or +1 at every node.
`Balance Factor = height(left subtree) - height(right subtree)`

```
Unbalanced (after inserting 1,2,3):
  1           ← BF = -2 (left=0, right=1) UNBALANCED!
   \
    2         ← BF = -1
     \
      3       ← BF = 0

After Left Rotation at node 1:
    2          ← BF = 0  BALANCED ✅
   / \
  1   3
```

### Rotations

```
Right Rotation (LL case):              Left Rotation (RR case):
    C                                      A
   /           →      B                    \         →      B
  B                  / \                    B              / \
 /                  A   C                    \            A   C
A                                             C

Left-Right (LR):                       Right-Left (RL):
  C                                        C
 /        → Right rotate B →  B            \        → Left rotate B →   B
B           then Left rotate C  \           B          then Right rotate C  /
 \                               C         /                              C
  B                             / \         B                           / \
                               A   C       A                           A   C
```

---

## 💡 Real-World Usage

| Application          | Tree Type        | Usage                  |
| -------------------- | ---------------- | ---------------------- |
| **File System**      | General Tree     | Folders within folders |
| **Database Index**   | B-Tree / B+ Tree | O(log n) data lookup   |
| **HTML DOM**         | General Tree     | Browser renders page   |
| **XML/JSON Parsing** | Tree             | Hierarchical data      |
| **Autocomplete**     | Trie             | Prefix matching        |
| **Priority Queue**   | Heap             | Scheduling, Dijkstra   |
| **Huffman Encoding** | Binary Tree      | Data compression       |
| **Compiler AST**     | General Tree     | Code parsing           |
| **Git**              | DAG (tree-like)  | Commit history         |

---

## 🎯 Interview Questions

### 🔥 Q1: Maximum Depth of Binary Tree

```javascript
// O(n) — DFS
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
// Every node: 1 + max(depth of children)
// Leaf nodes: 1 + max(0, 0) = 1
```

### 🔥 Q2: Invert Binary Tree

```javascript
// O(n) — swap children at every node
function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [root.right, root.left]; // swap
  invertTree(root.left);
  invertTree(root.right);
  return root;
}
/*
      4              4
    /   \    →     /   \
   2     7        7     2
  / \   / \      / \   / \
 1   3 6   9    9   6 3   1
*/
```

### 🔥 Q3: Is Valid BST?

```javascript
// O(n) — pass min/max bounds down the tree
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return (
    isValidBST(root.left, min, root.val) && // left must be < root
    isValidBST(root.right, root.val, max)
  ); // right must be > root
}
/*
Validate [5,1,4,null,null,3,6]:
      5  ← must be in (-∞, ∞): OK
     / \
    1   4  ← 4 must be in (5, ∞): 4 < 5 → INVALID ✅ returns false
       / \
      3   6
*/
```

### 🔥 Q4: Lowest Common Ancestor (BST)

```javascript
function lowestCommonAncestor(root, p, q) {
  // In BST: if both p and q are less than root, LCA is in left subtree
  // If both greater, LCA is in right subtree
  // Otherwise, root IS the LCA
  if (p.val < root.val && q.val < root.val)
    return lowestCommonAncestor(root.left, p, q);
  if (p.val > root.val && q.val > root.val)
    return lowestCommonAncestor(root.right, p, q);
  return root; // split point = LCA!
}
```

### 🔥 Q5: Binary Tree Diameter

```javascript
// Diameter = longest path between any two nodes (may not pass through root)
function diameterOfBinaryTree(root) {
  let diameter = 0;

  function height(node) {
    if (!node) return 0;
    const left = height(node.left);
    const right = height(node.right);
    diameter = Math.max(diameter, left + right); // path through this node
    return 1 + Math.max(left, right);
  }

  height(root);
  return diameter;
}
/*
      1
     / \
    2   3
   / \
  4   5

height(4)=1, height(5)=1
At node 2: diameter candidate = 1+1 = 2
height(3)=1
At node 1: diameter candidate = 2+1 = 3 ← answer
*/
```

### Q6: Construct BST from Preorder Traversal

```javascript
// [8,5,1,7,10,12] → BST
function bstFromPreorder(preorder) {
  function build(min, max) {
    if (idx === preorder.length) return null;
    const val = preorder[idx];
    if (val < min || val > max) return null;
    idx++;
    const node = new TreeNode(val);
    node.left = build(min, val);
    node.right = build(val, max);
    return node;
  }
  let idx = 0;
  return build(-Infinity, Infinity);
}
```

---

## ⚡ Practice Problems

| #   | Problem                    | Difficulty | Technique     |
| --- | -------------------------- | ---------- | ------------- |
| 1   | Max Depth of Binary Tree   | Easy       | DFS recursive |
| 2   | Invert Binary Tree         | Easy       | DFS recursive |
| 3   | Same Tree                  | Easy       | DFS recursive |
| 4   | Symmetric Tree             | Easy       | DFS recursive |
| 5   | Path Sum                   | Easy       | DFS           |
| 6   | Level Order Traversal      | Medium     | BFS           |
| 7   | Validate BST               | Medium     | Bounds DFS    |
| 8   | LCA of Binary Tree         | Medium     | DFS           |
| 9   | Serialize/Deserialize Tree | Hard       | BFS/DFS       |
| 10  | Binary Tree Max Path Sum   | Hard       | DFS           |

---

## ⚠️ Common Mistakes

```javascript
// ❌ Not handling null root
function height(root) {
  return 1 + Math.max(height(root.left), height(root.right)); // TypeError if root=null!
}
// ✅ Always base case first
function height(root) {
  if (!root) return 0; // base case!
  return 1 + Math.max(height(root.left), height(root.right));
}

// ❌ Validating BST by only checking parent
function isValidBST(root) {
  if (!root) return true;
  if (root.left && root.left.val >= root.val) return false; // too naive!
  if (root.right && root.right.val <= root.val) return false;
  return isValidBST(root.left) && isValidBST(root.right);
}
// Fails for: [5,4,6,null,null,3,7] — 3 is in right subtree of 5 but 3 < 5!
// ✅ Use min/max bounds approach (see Q3 above)
```

---

**← Previous:** [06 — Hash Tables](./06-HashTables.md) | **Next →** [08 — Heaps](./08-Heaps.md)
