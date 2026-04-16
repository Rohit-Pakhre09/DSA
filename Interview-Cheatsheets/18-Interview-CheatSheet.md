# 18 — Interview Cheat Sheet 🎯

> **Your quick reference for interviews — patterns, complexities, and decision frameworks.**

---

## 🔥 The 15 Most Important Patterns

| #   | Pattern                  | When to Use                                   | Key Data Structures |
| --- | ------------------------ | --------------------------------------------- | ------------------- |
| 1   | **Two Pointers**         | Sorted array, pairs, palindromes              | Array               |
| 2   | **Sliding Window**       | Subarray/substring of size k                  | Array, Map          |
| 3   | **Fast & Slow Pointers** | Cycle detection, middle of list               | Linked List         |
| 4   | **Binary Search**        | Sorted array, search space problems           | Array               |
| 5   | **BFS**                  | Shortest path (unweighted), level order       | Queue               |
| 6   | **DFS**                  | All paths, connected components, backtracking | Stack/Recursion     |
| 7   | **Hash Map**             | Frequency count, complement lookup            | Map, Set            |
| 8   | **Prefix Sum**           | Range sum queries                             | Array               |
| 9   | **Monotonic Stack**      | Next greater/smaller element                  | Stack               |
| 10  | **Heap/Priority Queue**  | Kth largest, top-K, merge K lists             | Heap                |
| 11  | **Topological Sort**     | Dependencies, ordering in DAG                 | Queue + in-degree   |
| 12  | **Dynamic Programming**  | Optimization, count ways, feasibility         | Array, Matrix       |
| 13  | **Union Find**           | Connected components, cycle detection         | Parent array        |
| 14  | **Backtracking**         | Permutations, subsets, combinations           | Recursion           |
| 15  | **Greedy**               | Locally optimal → globally optimal            | Sort + iterate      |

---

## 🧠 Problem-to-Pattern Decision Tree

```
Is the input SORTED? ──────────────────────────────────→ Binary Search or Two Pointers
                                                         or Sliding Window

Is it a LINKED LIST? ──────────────────────────────────→ Fast & Slow Pointers (cycle)
                                                         → Reverse / Merge pattern

Is it a TREE?
  └─ Level by level? ─────────────────────────────────→ BFS (Queue)
  └─ Path/subtree? ───────────────────────────────────→ DFS (Recursion)
  └─ BST? ────────────────────────────────────────────→ In-order = sorted, bounds DFS

Is it a GRAPH?
  └─ Shortest path, unweighted? ──────────────────────→ BFS
  └─ Shortest path, weighted? ────────────────────────→ Dijkstra
  └─ All paths / connectivity? ───────────────────────→ DFS
  └─ Dependencies / ordering? ────────────────────────→ Topological Sort
  └─ Group/union nodes? ──────────────────────────────→ Union Find

Does it ask for MAXIMUM/MINIMUM?
  └─ At each step locally? ───────────────────────────→ Greedy
  └─ Globally with overlap? ──────────────────────────→ Dynamic Programming

Does it ask to COUNT ways or IS IT POSSIBLE?
  └─ Subproblems overlap? ─────────────────────────────→ DP
  └─ Need all solutions? ──────────────────────────────→ Backtracking

Top-K / Kth largest? ──────────────────────────────────→ Heap (Priority Queue)

Substring/Subarray (contiguous)?
  └─ Fixed size? ─────────────────────────────────────→ Sliding Window
  └─ Variable size? ──────────────────────────────────→ Sliding Window + Map
  └─ Sum/count queries? ──────────────────────────────→ Prefix Sum

Duplicates / membership in O(1)? ──────────────────────→ HashSet
Key-value lookup in O(1)? ─────────────────────────────→ HashMap

Next greater/smaller element? ─────────────────────────→ Monotonic Stack
```

---

## ⚡ Complexity Cheat Sheet

```
Data Structure        Access    Search    Insert    Delete
──────────────────────────────────────────────────────────
Array                 O(1)      O(n)      O(n)*     O(n)
Stack (array)         O(n)      O(n)      O(1)      O(1)
Queue (linked list)   O(n)      O(n)      O(1)      O(1)
Hash Map/Set          O(1)**    O(1)**    O(1)**    O(1)**
Linked List (single)  O(n)      O(n)      O(1)^     O(1)^
Binary Search Tree    O(log n)  O(log n)  O(log n)  O(log n)
Heap (Binary)         O(1)***   O(n)      O(log n)  O(log n)
Trie                  O(k)      O(k)      O(k)      O(k)

*O(1) amortized for push/append
**Average case; O(n) worst case (collisions)
^O(1) only with direct reference; O(n) to find position
***O(1) for peek min/max only

Sorting Algorithms:
──────────────────────────────────────────────────────────
Merge Sort     O(n log n)  O(n log n)  O(n log n)  O(n) space  Stable
Quick Sort     O(n log n)  O(n log n)  O(n²) worst O(log n)    Unstable
Heap Sort      O(n log n)  O(n log n)  O(n log n)  O(1) space  Unstable
Tim Sort (JS)  O(n)        O(n log n)  O(n log n)  O(n) space  Stable
```

---

## 📝 Template: Two Pointers

```javascript
// Sorted array, find pair
function twoPointers(arr, target) {
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    else if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
}
```

## 📝 Template: Sliding Window (Fixed Size)

```javascript
function slidingWindowFixed(arr, k) {
  let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);
  let maxSum = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k]; // slide: add new, remove old
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}
```

## 📝 Template: Sliding Window (Variable Size)

```javascript
function slidingWindowVariable(arr, target) {
  let left = 0,
    right = 0,
    current = 0,
    result = Infinity;
  while (right < arr.length) {
    current += arr[right]; // expand window
    while (current >= target) {
      // condition to shrink
      result = Math.min(result, right - left + 1);
      current -= arr[left];
      left++;
    }
    right++;
  }
  return result === Infinity ? 0 : result;
}
```

## 📝 Template: Binary Search

```javascript
function binarySearch(arr, target) {
  let lo = 0,
    hi = arr.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2); // avoids overflow
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1; // not found
}

// Find left boundary (first occurrence)
function lowerBound(arr, target) {
  let lo = 0,
    hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
```

## 📝 Template: DFS (Graph)

```javascript
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  // process node
  for (let neighbor of graph[node] || []) {
    dfs(graph, neighbor, visited);
  }
}
```

## 📝 Template: BFS (Graph)

```javascript
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  while (queue.length) {
    const node = queue.shift();
    // process node
    for (let neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
```

## 📝 Template: Backtracking

```javascript
function backtrack(result, current, ...params) {
  if (/* base case met */) {
    result.push([...current]);
    return;
  }
  for (let choice of /* choices */) {
    current.push(choice);       // make choice
    backtrack(result, current, ...); // recurse
    current.pop();              // undo choice (backtrack)
  }
}
```

## 📝 Template: DP (1D)

```javascript
function dp1D(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = /* base case */;
  for (let i = 1; i <= n; i++) {
    dp[i] = /* recurrence using dp[i-1], dp[i-2], etc. */;
  }
  return dp[n];
}
```

## 📝 Template: DP (2D)

```javascript
function dp2D(m, n) {
  const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));
  // Initialize base cases
  for (let i = 0; i <= m; i++) dp[i][0] = /* base */;
  for (let j = 0; j <= n; j++) dp[0][j] = /* base */;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = /* recurrence */;
    }
  }
  return dp[m][n];
}
```

---

## 🎯 Top 50 LeetCode Problems by Pattern

### Arrays & Hashing

- Two Sum (Easy) #1
- Contains Duplicate (Easy) #217
- Valid Anagram (Easy) #242
- Group Anagrams (Medium) #49
- Top K Frequent (Medium) #347
- Product Except Self (Medium) #238
- Longest Consecutive (Medium) #128

### Two Pointers

- Valid Palindrome (Easy) #125
- 3Sum (Medium) #15
- Container With Most Water (Medium) #11
- Trapping Rain Water (Hard) #42

### Sliding Window

- Best Time Buy Stock (Easy) #121
- Longest No-Repeat Substring (Medium) #3
- Longest Repeating Char Replace (Medium) #424
- Permutation in String (Medium) #567
- Minimum Window Substring (Hard) #76

### Stack

- Valid Parentheses (Easy) #20
- Min Stack (Medium) #155
- Evaluate RPN (Medium) #150
- Daily Temperatures (Medium) #739
- Largest Rectangle Histogram (Hard) #84

### Binary Search

- Binary Search (Easy) #704
- Search a 2D Matrix (Medium) #74
- Koko Eating Bananas (Medium) #875
- Find Min Rotated Sorted (Medium) #153
- Search Rotated Sorted (Medium) #33

### Linked List

- Reverse Linked List (Easy) #206
- Merge Two Sorted (Easy) #21
- Linked List Cycle (Easy) #141
- Reorder List (Medium) #143
- Remove Nth From End (Medium) #19
- Copy List w/ Random Ptr (Medium) #138
- Add Two Numbers (Medium) #2

### Trees

- Invert Binary Tree (Easy) #226
- Max Depth (Easy) #104
- Same Tree (Easy) #100
- Subtree of Another (Easy) #572
- LCA of BST (Medium) #235
- Level Order Traversal (Medium) #102
- Validate BST (Medium) #98
- Kth Smallest in BST (Medium) #230
- Binary Tree Max Path (Hard) #124
- Serialize/Deserialize (Hard) #297

### Heap / Priority Queue

- Kth Largest Element (Medium) #215
- Last Stone Weight (Easy) #1046
- K Closest Points (Medium) #973
- Task Scheduler (Medium) #621
- Merge K Sorted Lists (Hard) #23

### Graphs

- Number of Islands (Medium) #200
- Clone Graph (Medium) #133
- Pacific Atlantic (Medium) #417
- Course Schedule (Medium) #207
- Course Schedule II (Medium) #210
- Rotting Oranges (Medium) #994
- Word Ladder (Hard) #127

### Dynamic Programming

- Climbing Stairs (Easy) #70
- House Robber (Medium) #198
- Longest Palindromic Substring (Medium) #5
- Coin Change (Medium) #322
- Longest Inc. Subsequence (Medium) #300
- Unique Paths (Medium) #62
- Word Break (Medium) #139
- Combination Sum IV (Medium) #377
- Edit Distance (Hard) #72
- Burst Balloons (Hard) #312

---

## 🏁 Interview Day Checklist

### Before Coding

- [ ] Clarify input: type, size, constraints
- [ ] Clarify output: return type, edge cases
- [ ] Ask about duplicates, negatives, empty input
- [ ] State examples → "Does this example look correct?"
- [ ] State your approach + complexity BEFORE coding

### While Coding

- [ ] Write clean, readable code (variable names matter)
- [ ] Start with brute force → optimize
- [ ] Handle edge cases (empty, single element, max/min)
- [ ] Talk through your thinking out loud

### After Coding

- [ ] Trace through your example manually
- [ ] Test edge cases: empty input, single element, duplicates
- [ ] State final time and space complexity
- [ ] Suggest optimizations if applicable

---

## ⚡ JavaScript Quick Reference

```javascript
// Array
arr.push(x)           // add to end O(1)
arr.pop()             // remove from end O(1)
arr.shift()           // remove from front O(n) ⚠️
arr.unshift(x)        // add to front O(n) ⚠️
arr.slice(i, j)       // copy subarray O(k)
arr.splice(i, n)      // remove n elements at i O(n)
arr.sort((a,b)=>a-b)  // sort ascending O(n log n)
arr.reverse()         // reverse in-place O(n)
arr.indexOf(x)        // linear search O(n)
arr.includes(x)       // linear search O(n)
arr.find(f)           // first match O(n)
arr.filter(f)         // all matches O(n)
arr.map(f)            // transform O(n)
arr.reduce(f, init)   // fold O(n)
arr.flat()            // flatten one level O(n)
Math.max(...arr)      // spread O(n)
[...new Set(arr)]     // deduplicate O(n)

// String
str.split('')         // to char array O(n)
chars.join('')        // to string O(n)
str.slice(i, j)       // substring O(k)
str.includes(s)       // search O(n)
str.trim()            // remove whitespace O(n)
str.toLowerCase()     // O(n)
str.charCodeAt(i)     // char code O(1)
String.fromCharCode(n)// from code O(1)

// Map
new Map()             // create
map.set(k, v)         // O(1)
map.get(k)            // O(1)
map.has(k)            // O(1)
map.delete(k)         // O(1)
map.size              // O(1)
for(let [k,v] of map) // O(n)

// Math
Math.floor(x)         // round down
Math.ceil(x)          // round up
Math.round(x)         // round nearest
Math.abs(x)           // absolute value
Math.max(a, b)        // maximum of two
Math.min(a, b)        // minimum of two
Math.sqrt(x)          // square root
Number.MAX_SAFE_INTEGER  // 2^53 - 1
Infinity               // use as "no value"
x >> 1                 // same as Math.floor(x/2) for positives
(lo + hi) >> 1         // safe midpoint
```

---

_Good luck! Remember: it's okay to think out loud, ask clarifying questions, and take a moment before diving in._ 🚀
