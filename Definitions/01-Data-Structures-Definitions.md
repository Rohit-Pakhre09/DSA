# Data Structures: Definitions & Cheat Sheet

This document contains quick, interview-focused definitions, examples, and important gotchas for all core data structures in JavaScript.

---

## 1. Arrays & Strings
*Note: In JavaScript, strings often behave similarly to arrays of characters, though strings are immutable.*

**📖 Definition:**
A linearly ordered collection of elements stored at contiguous memory locations (in lower-level languages). In JS, arrays are dynamic and can hold mixed variable types.

**💻 Example:**
```javascript
const fruits = ['Apple', 'Banana', 'Cherry'];
fruits.push('Date'); // Adds to end
console.log(fruits[1]); // Output: Banana
```

**💡 Additional Information:**
- Time Complexity: O(1) for index access and pushing/popping from the end. O(N) for inserting/deleting at the beginning or middle (due to shifting elements).
- Very cache-friendly data structure.

**⚠️ Things to Keep in Mind:**
- Keep an eye on methods that look like O(1) but are actually O(N) under the hood (e.g., `Array.prototype.shift()` and `Array.prototype.unshift()`).

---

## 2. Linked Lists
**📖 Definition:**
A sequence of nodes where each node contains data and a pointer (reference) to the next node in the sequence. Can be Singly Linked (points to next), Doubly Linked (points to next and previous), or Circular.

**💻 Example:**
```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const head = new Node(10);
head.next = new Node(20);
```

**💡 Additional Information:**
- Time Complexity: O(1) for insertion/deletion at the head (or tail if tail pointer is tracked). O(N) for search and random access.
- Great for avoiding the O(N) shifting cost of Arrays when frequently adding/removing items at ends.

**⚠️ Things to Keep in Mind:**
- You must always keep track of the `head` pointer. If you lose the head, you lose the entire list!
- "Runner" (slow/fast pointer) techniques are common in Linked List interview questions (e.g., detecting cycles).

---

## 3. Stacks
**📖 Definition:**
A Last-In-First-Out (LIFO) data structure. The last element added to the stack is the first one removed. Imagine a stack of plates.

**💻 Example:**
```javascript
// In JS, Arrays naturally act as stacks
const stack = [];
stack.push(1); // Add to top
stack.push(2);
const popped = stack.pop(); // Removes 2
```

**💡 Additional Information:**
- Time Complexity: O(1) for `push` and `pop`.
- Highly relevant for backtracking, depth-first search (DFS), and parsing problems (like valid parentheses).

**⚠️ Things to Keep in Mind:**
- While JS Arrays act as stacks easily, technically JavaScript arrays can resize and aren't pure O(1) memory buffers, but for interviews, `push`/`pop` on JS arrays is considered O(1).

---

## 4. Queues
**📖 Definition:**
A First-In-First-Out (FIFO) data structure. The first element added is the first one to be removed. Imagine a line at a grocery store.

**💻 Example:**
```javascript
// Simple array-based queue (not optimal for large datasets due to shift() cost)
const queue = [];
queue.push(1); // Enqueue
queue.push(2);
const shifted = queue.shift(); // Dequeue processing: removes 1
```

**💡 Additional Information:**
- Relevant for breadth-first search (BFS), scheduling systems, and buffering tasks.

**⚠️ Things to Keep in Mind:**
- **Crucial Gotcha:** Using `shift()` in a JS array is O(N) because it requires re-indexing the whole array. In an interview, mention that for a true O(1) Queue, you would implement it using a Linked List or a circular array pointer.

---

## 5. Hash Tables / Maps / Sets
**📖 Definition:**
A structure that maps keys to values for highly efficient lookup. It uses a hash function to compute an index into an array of buckets or slots.

**💻 Example:**
```javascript
const map = new Map();
map.set('name', 'Alice');
console.log(map.get('name')); // 'Alice'
console.log(map.has('age')); // false

const set = new Set([1, 2, 2, 3]); // set contains {1, 2, 3}
```

**💡 Additional Information:**
- Time Complexity: Average O(1) for Insert, Delete, and Search. Worst-case O(N) (if there are many hash collisions).
- Use `Set` when you only care about unique keys, and `Map` or JS Objects `{}` when you need key-value pairs.

**⚠️ Things to Keep in Mind:**
- Standard JS objects (`{}`) only support Strings and Symbols as keys; JS Maps can use *any* type (even objects or arrays) as a key.
- Hash collisions occur when different keys hash to the same bucket; they are commonly resolved via chaining (linked lists) or open addressing.

---

## 6. Trees (Binary Tree, BST, AVL)
**📖 Definition:**
A hierarchical structure featuring a root node and child nodes.
- **Binary Tree:** Each node has at most two children (left and right).
- **Binary Search Tree (BST):** Left child is always less than the parent; right child is always greater.

**💻 Example:**
```javascript
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
```

**💡 Additional Information:**
- Time Complexity (BST): Average O(log N) for Search, Insert, and Delete. Worst case O(N) if the tree becomes completely unbalanced (like a linked list).
- AVL and Red-Black trees are *self-balancing* tree formats ensuring O(log N) operations.

**⚠️ Things to Keep in Mind:**
- Understand the 3 main Depth-First traversals: **In-order** (Left, Root, Right), **Pre-order** (Root, Left, Right), and **Post-order** (Left, Right, Root).
- In a valid BST, an *In-order* traversal prints the nodes in perfectly sorted order.

---

## 7. Heaps & Priority Queues
**📖 Definition:**
A special tree-based structure commonly implemented as an array.
- **Min-Heap:** The root is the smallest number; children are larger than their parent.
- **Max-Heap:** The root is the largest number; children are smaller than their parent.

**💻 Example:**
```javascript
// A Math example mapping parents to children in an array-bound heap:
// Parent at index i. Left child at (2i + 1), Right child at (2i + 2)
```

**💡 Additional Information:**
- Time Complexity: O(1) to find Min/Max. O(log N) to Insert or Extract Min/Max.
- Commonly used for shortest path algorithms (Dijkstra) or fetching the "Top K" frequent elements.

**⚠️ Things to Keep in Mind:**
- JavaScript does **not** have a built-in Heap/Priority Queue class. You usually have to build it from scratch in an interview or let the interviewer know you are assuming a `PriorityQueue` class exists to save time.

---

## 8. Graphs
**📖 Definition:**
A collection of nodes (vertices) connected by edges. Can be Directed (edges have one-way direction), Undirected (two-way), Weighted (edges have cost), or Unweighted.

**💻 Example:**
```javascript
// Adjacency List Representation
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A'],
  D: ['B']
};
```

**💡 Additional Information:**
- Time Complexity depends on representation. Adjacency Lists are O(V + E) for traversal (where V = vertices, E = edges).
- Best used for networking mapping, routing, relationship tracking (like friends on a social network).

**⚠️ Things to Keep in Mind:**
- **Visited Sets:** You MUST track which nodes you have already visited using a `Set` to avoid infinite loops and cycles during DFS/BFS traversal!

---

## 9. Tries (Prefix Trees)
**📖 Definition:**
A tree-like data structure whose nodes store the letters of an alphabet. By structuring the nodes top-down, words/strings can be retrieved by traversing down a branch path of the tree.

**💻 Example:**
```javascript
class TrieNode {
    constructor() {
        this.children = {}; // maps char -> TrieNode
        this.isEndOfWord = false;
    }
}
```

**💡 Additional Information:**
- Time Complexity: O(L) for Insert and Search, where L is the length of the string.
- Widely used for autocomplete features, spell-checking, and IP routing.

**⚠️ Things to Keep in Mind:**
- They are very memory heavy because every node character may instantiate a completely new map of children pointers.

---

## 10. Disjoint Set / Union-Find
**📖 Definition:**
A data structure that keeps track of a set of elements partitioned into a number of disjoint (non-overlapping) subsets. Provides near-constant-time operations to add new sets, merge existing sets, and determine whether elements are in the same set.

**💻 Example:**
```javascript
class UnionFind {
  // Implementations usually utilize a 'parents' array and a 'rank/size' array.
}
```

**💡 Additional Information:**
- Heavily utilized in Kruskal's algorithm (finding Minimum Spanning Tree) and efficiently finding connected components or cycles in an undirected graph.

**⚠️ Things to Keep in Mind:**
- Without optimizations, it's slow. Ensure you utilize **Path Compression** (pointing nodes directly to the ultimate root on find) and **Union by Rank/Size** (hanging the smaller tree under the larger tree). Combining these gives an amortized complexity of O(α(N)), practically O(1).
