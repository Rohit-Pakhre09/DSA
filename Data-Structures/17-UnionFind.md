# 17 — Disjoint Set / Union Find

> **The most efficient way to track network connectivity, image pixels, or groups in disjoint sets.**

---

## 📖 Definition

The **Disjoint Set** (or Union-Find) is a data structure that tracks a set of elements partitioned into a number of disjoint (non-overlapping) subsets.

It provides near constant time `O(1)` operations for two crucial functions:
1. **Find**: Determine which subset a particular element is in.
2. **Union**: Join two subsets into a single subset.

---

## 🖼️ Algorithm Mechanics

We represent sets as trees. Initially, every node is its own "root" or parent. 
When we group nodes:
- We make the root of one node point to the root of the other.

**Optimizations:**
1. **Path Compression**: During `find()`, make every visited node point directly to the root, flattening the tree heavily.
2. **Union by Rank / Size**: During `union()`, always attach the smaller tree under the taller/larger tree to keep trees shallow.

---

## 🖼️ Algorithm Visualization (Path Compression)

```
Initial Find Paths:
      0
     /
    1
   /
  2    <- find(3) called!
 /
3

After Path Compression:
All nodes directly point to the root.
      0
   /  |  \
  1   2   3
  
Next time find(3) is called, it is instantly O(1).
```

---

## 📊 Complexity Reference

| Operation | Time Complexity | Space Complexity |
| :--- | :--- | :--- |
| **Find** | `O(α(N))` ≈ `O(1)` | `O(1)` |
| **Union** | `O(α(N))` ≈ `O(1)` | `O(1)` |

_`α(N)` is the Inverse Ackermann function. For all practical values of N in the universe, `α(N) ≤ 4`. This is effectively constant time!_
Construction space takes `O(N)` to store the arrays.

---

## 💻 Implementation (Optimized with Path Compression & Rank)

```javascript
class UnionFind {
  constructor(size) {
    // Array holding the parent of each node
    // Initially, each node is its own parent (e.g., [0, 1, 2, 3])
    this.parent = Array.from({ length: size }, (_, i) => i);
    
    // Array holding the rank (depth) of tree for each root
    this.rank = Array(size).fill(1);
  }

  // Find the root of node 'x' with PATH COMPRESSION
  find(x) {
    if (this.parent[x] !== x) {
      // Recursively step up to root, flattening the tree on the way back
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  // Union the sets containing 'x' and 'y' by RANK
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) {
      return false; // Already in the same set (CYCLE DETECTED!)
    }

    // Attach shorter tree under taller tree
    if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else {
      this.parent[rootY] = rootX; // Attach either
      this.rank[rootX] += 1;     // Increase rank since ties merge
    }
    
    return true; // Union successful
  }
}
```

---

## 💡 Real-World Usage

| Application | Algorithm | Usage |
| :--- | :--- | :--- |
| **Network Connectivity** | Union-Find | Determining if two computers belong to the same local network or internet sub-graph. |
| **Image Processing** | Union-Find | Labeling connected components in an image to identify distinct shapes or clusters of similar pixels. |
| **Spanning Trees** | Kruskal's MST | Checking if adding an edge to a spanning tree forms a cycle during the algorithm. |
| **Physics/Materials** | Percolation Theory | Modeling if a liquid can seep through porous materials from top to bottom. |

---

## 🎯 Interview Questions

### 🔥 Q1: Number of Connected Components in an Undirected Graph

```javascript
// LeetCode #323 — O(E + V) Time
function countComponents(n, edges) {
  const uf = new UnionFind(n);
  let componentCount = n;
  
  for (const [u, v] of edges) {
    if (uf.union(u, v)) {
      componentCount--; // Two sets merged, total components drop by 1
    }
  }
  
  return componentCount;
}
```

### 🔥 Q2: Redundant Connection (Cycle Detection)

```javascript
// LeetCode #684 — Remove one edge that forms a cycle
function findRedundantConnection(edges) {
  const n = edges.length;
  const uf = new UnionFind(n + 1); // 1-indexed graph
  
  for (const [u, v] of edges) {
    // If union returns false, they already share a root! A cycle!
    if (!uf.union(u, v)) {
      return [u, v]; 
    }
  }
}
```

### 🔥 Q3: Number of Provinces

```javascript
// LeetCode #547 — Find graph components via Adjacency Matrix
function findCircleNum(isConnected) {
  const n = isConnected.length;
  const uf = new UnionFind(n);
  let count = n;
  
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isConnected[i][j] === 1 && uf.union(i, j)) {
        count--;
      }
    }
  }
  
  return count;
}
```

---

## ⚡ Practice Problems

| # | Problem | Difficulty | Concept |
| :--- | :--- | :--- | :--- |
| 1 | Number of Provinces | Medium | Matrix Components |
| 2 | Redundant Connection | Medium | Cycle Detection |
| 3 | Graph Valid Tree | Medium | Cycle + Component checks |
| 4 | Accounts Merge | Medium | UF with Strings/Hash Maps |
| 5 | Number of Islands II | Hard | Dynamic Grid UF |

---

## ⚠️ Common Mistakes

- **Forgetting Path Compression**: Just writing `while(parent[x] !== x) x = parent[x]` is standard `find`. Modifying the array `parent[x] = find(parent[x])` makes it nearly `O(1)`. Do not forget it!
- **Path compression overwriting trees**: Be careful not to compress paths indiscriminately without `Union by Rank/Size` if you are tracking the size of the sets specifically for an algorithm answer.

---

**← Previous:** [16 — Tries](./16-Tries.md) | **Next →** [18 — Interview Cheat Sheet](../Interview%20Cheatsheets/18-Interview-CheatSheet.md)
