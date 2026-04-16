# 14 — Greedy Algorithms

> **Making the locally optimal choice at each stage with the hope of finding a global optimum.**

---

## 📖 Definition

A algorithm is **greedy** if it builds up a solution piece by piece, always choosing the next piece that offers the most obvious and immediate benefit. 

- **Does not reconsider choices**: Once a choice is made, it is never changed (unlike Backtracking or DP).
- **When to use**: Not every problem can be solved greedily! It must have the _Greedy Choice Property_ and _Optimal Substructure_.

---

## 🖼️ Greedy vs Dynamic Programming

| Characteristic | Greedy | Dynamic Programming |
| :--- | :--- | :--- |
| **Approach** | Top-down (make a choice, then solve the subproblem) | Bottom-up or Top-down with memoization |
| **Re-evaluation** | Never | Exhausts all options |
| **Speed** | Usually faster `O(n)` or `O(n log n)` | Usually slower `O(n^2)` or worse |
| **Optimality** | Not guaranteed for all problems | Guaranteed global optimum |

---

## 💻 Canonical Examples

### Minimum Coin Change (Greedy works ONLY on standard US denominations)

```javascript
// Works for coins = [25, 10, 5, 1], DOES NOT work reliably for arbitrary ones like [1, 3, 4] where amount = 6
function getMinCoinsGreedy(amount) {
  const coins = [25, 10, 5, 1];
  let count = 0;
  
  for (let coin of coins) {
    while (amount >= coin) {
      amount -= coin;
      count++;
    }
  }
  return count;
}
```

---

## 💡 Real-World Usage

| Application | Algorithm | Usage |
| :--- | :--- | :--- |
| **Data Compression** | Huffman Coding | Uses a greedy approach to assign variable-length codes to characters based on frequency. |
| **Network Routing** | Dijkstra's Algorithm | Greedily picks the closest unvisited node to find the shortest path in a graph. |
| **Spanning Trees** | Kruskal's / Prim's | Network design (like laying cables) greedily picks the cheapest edges that don't form a cycle. |
| **Resource Allocation** | Fractional Knapsack | Greedily takes items with the highest value-to-weight ratio to maximize capacity utility. |

---

## 🎯 Interview Questions

### 🔥 Q1: Jump Game

```javascript
// LeetCode #55 — O(n) Time, O(1) Space
// Idea: Keep track of the maximum reachable index.
function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false; // We can't even reach this index
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) return true; // Can reach the end
  }
  return true;
}
```

### 🔥 Q2: Assign Cookies

```javascript
// LeetCode #455 — O(n log n) Time
// Idea: Sort both arrays. Give the smallest cookie to the least greedy child.
function findContentChildren(g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  
  let child = 0;
  let cookie = 0;
  
  while (child < g.length && cookie < s.length) {
    if (s[cookie] >= g[child]) {
      // Cookie fits, child gets it
      child++;
    }
    cookie++; // Always move to the next cookie
  }
  
  return child;
}
```

### 🔥 Q3: Task Scheduler

```javascript
// LeetCode #621 — O(n) Time
function leastInterval(tasks, n) {
  const freqs = Array(26).fill(0);
  for (let task of tasks) {
    freqs[task.charCodeAt(0) - 65]++;
  }
  
  freqs.sort((a, b) => a - b);
  const maxFreq = freqs[25];
  let idleTime = (maxFreq - 1) * n;
  
  for (let i = 24; i >= 0 && idleTime > 0; i--) {
    idleTime -= Math.min(maxFreq - 1, freqs[i]);
  }
  
  return tasks.length + Math.max(0, idleTime);
}
```

---

## ⚡ Practice Problems

| # | Problem | Difficulty | Notes |
| :--- | :--- | :--- | :--- |
| 1 | Assign Cookies | Easy | Sorting + Two Pointers |
| 2 | Maximum Subarray | Medium | Kadane's Algorithm |
| 3 | Jump Game | Medium | Reachability tracking |
| 4 | Gas Station | Medium | Global vs Local tracking |
| 5 | Non-overlapping Intervals | Medium | Sort by end-time (Activity Selection) |
| 6 | Minimum Number of Arrows to Burst Balloons | Medium | Sort by end-time |

---

## ⚠️ Common Mistakes

- **Assuming greedy always works**: Just because a greedy solution passes basic test cases doesn't mean it's globally optimal. Prove it or check if it's a known DP problem (like integer knapsack).
- **Not sorting first**: Many greedy algorithms rely on processing data in a specific order (e.g., shortest jobs first, largest capacity first). Forgetting to sort `O(n log n)` makes the greedy aspect fail.

---

**← Previous:** [13 — Dynamic Programming](./13-DynamicProgramming.md) | **Next →** [15 — Sliding Window & Two Pointers](./15-SlidingWindow-TwoPointers.md)
