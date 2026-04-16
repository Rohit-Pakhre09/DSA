# 09 — Graphs

> **The most powerful and versatile data structure — models any network of relationships.**

---

## 📖 Definition

A **Graph** is a collection of **vertices (nodes)** and **edges (connections)** between them.
`G = (V, E)` where V = vertices, E = edges

---

## 🖼️ Types of Graphs

```
Undirected Graph          Directed Graph (Digraph)
(edges have no direction) (edges have direction)

  A ── B                   A ──→ B
  │    │                   │     │
  C ── D                   ↓     ↓
                            C     D

Weighted Graph             DAG (Directed Acyclic Graph)
(edges have costs)         (no cycles — used for topological sort)

  A ──5── B                 A ──→ B ──→ D
  │       │                       │
  3       2                  C ──→┘
  │       │
  C ──4── D

Connected Graph            Disconnected Graph
(path exists between        (some nodes unreachable)
every pair of nodes)
  A ─ B                    A ─ B    C ─ D
  │   │                              (C,D separate from A,B)
  C ─ D
```

---

## 💻 Graph Representations

### 1. Adjacency List (Most Common)

```javascript
// Space: O(V + E)   Access neighbors: O(degree)
// Best for: sparse graphs, BFS/DFS

// Undirected graph: A-B, A-C, B-D, C-D
const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "D"],
  D: ["B", "C"],
};

// Using Map for non-string keys
const graphMap = new Map([
  [0, [1, 2]],
  [1, [0, 3]],
  [2, [0, 3]],
  [3, [1, 2]],
]);

// Build adjacency list from edge list
function buildGraph(n, edges, directed = false) {
  const adj = Array.from({ length: n }, () => []);
  for (let [u, v] of edges) {
    adj[u].push(v);
    if (!directed) adj[v].push(u); // undirected: both ways
  }
  return adj;
}
```

### 2. Adjacency Matrix

```javascript
// Space: O(V²)   Access (u,v): O(1)   Neighbors: O(V)
// Best for: dense graphs, edge weight queries

// 4 nodes: A=0, B=1, C=2, D=3
// Edges: A-B, A-C, B-D
const matrix = [
  [0, 1, 1, 0], // A connects to B, C
  [1, 0, 0, 1], // B connects to A, D
  [1, 0, 0, 1], // C connects to A, D
  [0, 1, 1, 0], // D connects to B, C
];
// matrix[u][v] = 1 means edge from u to v
// For weighted: matrix[u][v] = weight (Infinity if no edge)
```

### 3. Edge List

```javascript
// Space: O(E)   Rarely used for traversal, useful for Kruskal's
const edges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
];
```

---

## 📊 Complexity Reference

| Operation        | Adj. List | Adj. Matrix |
| ---------------- | --------- | ----------- |
| Space            | O(V + E)  | O(V²)       |
| Add vertex       | O(1)      | O(V²)       |
| Add edge         | O(1)      | O(1)        |
| Remove edge      | O(E)      | O(1)        |
| Check edge (u,v) | O(degree) | O(1)        |
| Get neighbors    | O(degree) | O(V)        |

---

## 🔥 Core Traversals

### DFS (Depth First Search)

```javascript
// Explore as deep as possible before backtracking
// Uses: connectivity, path finding, cycle detection, topological sort

// Recursive DFS — O(V + E)
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  console.log(node); // process node

  for (let neighbor of graph[node] || []) {
    dfs(graph, neighbor, visited);
  }
}

// Iterative DFS — O(V + E)
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];

  while (stack.length) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    console.log(node);
    for (let neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) stack.push(neighbor);
    }
  }
}

/*
Graph: A-B-D, A-C-D
DFS from A:
Stack: [A]
Process A → Stack: [B, C] (or [C, B])
Process C → Stack: [B, D]
Process D → Stack: [B]
Process B → Stack: [D] (D already visited)
Visited: A, C, D, B
*/
```

### BFS (Breadth First Search)

```javascript
// Explore all neighbors before going deeper — level by level
// Uses: shortest path (unweighted), level-order, bipartite check

// BFS — O(V + E)
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];

  while (queue.length) {
    const node = queue.shift();
    order.push(node);

    for (let neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}

// BFS shortest path (unweighted)
function shortestPath(graph, start, end) {
  const visited = new Set([start]);
  const queue = [[start, [start]]]; // [node, path]

  while (queue.length) {
    const [node, path] = queue.shift();
    if (node === end) return path;

    for (let neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  return null; // no path
}
```

---

## 💡 Real-World Usage

| Application                | Graph Type        | Algorithm                |
| -------------------------- | ----------------- | ------------------------ |
| **Google Maps**            | Weighted directed | Dijkstra / A\*           |
| **Social Networks**        | Undirected        | BFS (friends of friends) |
| **Web Crawling**           | Directed          | DFS/BFS                  |
| **Dependency Resolution**  | DAG               | Topological Sort         |
| **Recommendation Systems** | Bipartite         | Matching                 |
| **Network Routing**        | Weighted          | Bellman-Ford             |
| **Task Scheduling**        | DAG               | Topological Sort         |
| **Circuit Design**         | Planar graph      | Various                  |

---

## 🔥 Advanced Algorithms

### Dijkstra's Shortest Path — O((V+E) log V)

```javascript
// Shortest path from source to all nodes (non-negative weights)
function dijkstra(graph, source) {
  // graph[u] = [[v, weight], ...]
  const n = graph.length;
  const dist = new Array(n).fill(Infinity);
  dist[source] = 0;

  // Min-heap: [distance, node]
  // Using sorted array as simple priority queue (use real heap for production)
  const pq = [[0, source]];

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]); // O(n log n) — use MinHeap for O(log n)
    const [d, u] = pq.shift();

    if (d > dist[u]) continue; // outdated entry

    for (let [v, w] of graph[u] || []) {
      const newDist = dist[u] + w;
      if (newDist < dist[v]) {
        dist[v] = newDist;
        pq.push([newDist, v]);
      }
    }
  }
  return dist;
}
// dist[v] = shortest distance from source to v (Infinity if unreachable)
```

### Topological Sort (Kahn's Algorithm — BFS)

```javascript
// Linear ordering of vertices in a DAG
// Used for: build systems, course prerequisites, task scheduling

function topologicalSort(numNodes, edges) {
  const adj = Array.from({ length: numNodes }, () => []);
  const inDegree = new Array(numNodes).fill(0);

  for (let [u, v] of edges) {
    adj[u].push(v);
    inDegree[v]++;
  }

  // Start with all nodes that have no dependencies
  const queue = [];
  for (let i = 0; i < numNodes; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const result = [];
  while (queue.length) {
    const node = queue.shift();
    result.push(node);

    for (let neighbor of adj[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  // If result has fewer nodes, graph has a cycle!
  return result.length === numNodes ? result : [];
}
// edges: [[0,1],[0,2],[1,3],[2,3]] → [0,1,2,3] or [0,2,1,3]
```

### Detect Cycle in Directed Graph (DFS)

```javascript
function hasCycle(numNodes, edges) {
  const adj = Array.from({ length: numNodes }, () => []);
  for (let [u, v] of edges) adj[u].push(v);

  const WHITE = 0,
    GRAY = 1,
    BLACK = 2; // unvisited, in-progress, done
  const color = new Array(numNodes).fill(WHITE);

  function dfs(node) {
    color[node] = GRAY; // mark as in current path
    for (let neighbor of adj[node]) {
      if (color[neighbor] === GRAY) return true; // back edge = cycle!
      if (color[neighbor] === WHITE && dfs(neighbor)) return true;
    }
    color[node] = BLACK; // fully processed
    return false;
  }

  for (let i = 0; i < numNodes; i++) {
    if (color[i] === WHITE && dfs(i)) return true;
  }
  return false;
}
```

### Union-Find (for undirected cycle detection)

```javascript
// Covered fully in 17-UnionFind.md
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }
  union(x, y) {
    const [px, py] = [this.find(x), this.find(y)];
    if (px === py) return false; // already connected = cycle!
    if (this.rank[px] < this.rank[py]) this.parent[px] = py;
    else if (this.rank[px] > this.rank[py]) this.parent[py] = px;
    else {
      this.parent[py] = px;
      this.rank[px]++;
    }
    return true;
  }
}
```

---

## 🎯 Interview Questions

### 🔥 Q1: Number of Islands

```javascript
// LeetCode #200 — DFS on grid — O(m×n)
function numIslands(grid) {
  const m = grid.length,
    n = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== "1") return;
    grid[r][c] = "0"; // mark visited (sink the island)
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}
/*
Grid:
1 1 0 0 0
1 1 0 0 0
0 0 1 0 0
0 0 0 1 1
→ 3 islands
*/
```

### 🔥 Q2: Course Schedule (Cycle Detection)

```javascript
// LeetCode #207 — Can you finish all courses? = Is there a cycle?
function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  for (let [course, prereq] of prerequisites) adj[prereq].push(course);

  const state = new Array(numCourses).fill(0); // 0=unvisited, 1=visiting, 2=done

  function dfs(node) {
    if (state[node] === 1) return false; // cycle!
    if (state[node] === 2) return true; // already processed
    state[node] = 1; // mark as visiting
    for (let next of adj[node]) {
      if (!dfs(next)) return false;
    }
    state[node] = 2; // mark as done
    return true;
  }

  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) return false;
  }
  return true;
}
// [[1,0],[0,1]] → false (cycle: 0→1→0)
// [[1,0],[2,0],[3,1],[3,2]] → true
```

### 🔥 Q3: Rotting Oranges (Multi-source BFS)

```javascript
// LeetCode #994 — BFS from all rotten oranges simultaneously
function orangesRotting(grid) {
  const m = grid.length,
    n = grid[0].length;
  const queue = [],
    dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
  let fresh = 0,
    minutes = 0;

  // Find all initially rotten oranges and count fresh ones
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      if (grid[r][c] === 1) fresh++;
    }
  }

  // BFS spreading rot
  while (queue.length && fresh > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift();
      for (let [dr, dc] of dirs) {
        const nr = r + dr,
          nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;
          fresh--;
          queue.push([nr, nc]);
        }
      }
    }
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}
/*
[[2,1,1],[1,1,0],[0,1,1]] → 4 minutes
Start: rotten = [(0,0)]
Min 1: (0,1),(1,0) → 2 rotten
Min 2: (0,2),(1,1) → 2 more
Min 3: (2,1) → 1 more
Min 4: (2,2) → 1 more, fresh=0 ✅
*/
```

### Q4: Word Ladder (BFS Shortest Path)

```javascript
// LeetCode #127 — Transform "hit" → "cog" changing one char at a time
function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue = [[beginWord, 1]]; // [word, length]
  const visited = new Set([beginWord]);

  while (queue.length) {
    const [word, len] = queue.shift();
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        // try all 'a'-'z'
        const newWord =
          word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (newWord === endWord) return len + 1;
        if (wordSet.has(newWord) && !visited.has(newWord)) {
          visited.add(newWord);
          queue.push([newWord, len + 1]);
        }
      }
    }
  }
  return 0;
}
// "hit","cog",["hot","dot","dog","lot","log","cog"] → 5
// hit→hot→dot→dog→cog (5 words)
```

---

## ⚡ Practice Problems

| #   | Problem                     | Difficulty | Algorithm         |
| --- | --------------------------- | ---------- | ----------------- |
| 1   | Number of Islands           | Medium     | DFS/BFS on grid   |
| 2   | Clone Graph                 | Medium     | DFS/BFS           |
| 3   | Course Schedule             | Medium     | Topo Sort / Cycle |
| 4   | Pacific Atlantic Water Flow | Medium     | Multi-source DFS  |
| 5   | Rotting Oranges             | Medium     | Multi-source BFS  |
| 6   | Word Ladder                 | Hard       | BFS               |
| 7   | Course Schedule II          | Medium     | Topological Sort  |
| 8   | Surrounded Regions          | Medium     | BFS from border   |
| 9   | Network Delay Time          | Medium     | Dijkstra          |
| 10  | Alien Dictionary            | Hard       | Topo Sort         |

---

## ⚠️ Common Mistakes

```javascript
// ❌ Forgetting to mark visited BEFORE adding to queue (causes duplicates)
queue.push(neighbor);
// ✅ Mark visited when adding to queue, not when processing
visited.add(neighbor);
queue.push(neighbor);

// ❌ Not handling disconnected graphs
function dfs(graph, node) {
  /* only visits connected component! */
}
// ✅ Call DFS from all unvisited nodes
for (let node of allNodes) {
  if (!visited.has(node)) dfs(graph, node, visited);
}

// ❌ Off-by-one in BFS levels
while (queue.length) {
  const [node] = queue.shift(); // processes one node per iteration
  // To process level-by-level, capture size at start of each level
}
// ✅
while (queue.length) {
  const levelSize = queue.length; // snapshot current level
  for (let i = 0; i < levelSize; i++) {
    /* process entire level */
  }
}
```

---

**← Previous:** [08 — Heaps](./08-Heaps.md) | **Next →** [10 — Sorting](../Algorithms/10-Sorting.md)
