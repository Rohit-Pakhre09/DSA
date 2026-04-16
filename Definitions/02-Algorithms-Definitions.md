# Algorithms: Definitions & Cheat Sheet

This document contains quick, interview-focused definitions, examples, and important gotchas for all core algorithms and paradigms in JavaScript.

---

## 1. Sorting Algorithms
**📖 Definition:**
Algorithms that put elements of a list into an order (e.g., numerical or lexicographical).
- **Merge Sort:** Divides the array in half recursively, then merges the sorted halves.
- **Quick Sort:** Picks a "pivot", partitions the array so smaller elements are left and larger are right, then recurses.

**💻 Example:**
```javascript
// Array.prototype.sort() in JS sorts in-place.
// CAUTION: It sorts elements as STRINGS by default!
const nums = [10, 5, 2, 8];
nums.sort((a, b) => a - b); // Ascending order: [2, 5, 8, 10]
```

**💡 Additional Information:**
- Time Complexity limit for comparison sorting: O(N log N).
- Merge Sort is O(N log N) consistently but requires O(N) spatial memory.
- Quick Sort is O(N log N) average, O(N²) worst-case, but since it sorts in-place, memory is usually O(log N).

**⚠️ Things to Keep in Mind:**
- Without `(a, b) => a - b`, JS `sort()` will sort `[10, 2]` as `[10, 2]` because `"10"` comes before `"2"` lexicographically!

---

## 2. Searching Algorithms
**📖 Definition:**
Algorithms for finding an item in a dataset.
- **Linear Search:** Checking every element one-by-one.
- **Binary Search:** Searching a *sorted* array by repeatedly dividing the search interval in half.

**💻 Example:**
```javascript
// Binary Search Snippet
let left = 0, right = arr.length - 1;
while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
}
```

**💡 Additional Information:**
- Time Complexity: Linear Search is O(N). Binary Search is O(log N).
- Binary Search is extremely powerful and can be applied to many problems where a search space is functionally monotonic (increasing or decreasing).

**⚠️ Things to Keep in Mind:**
- Beware of integer overflow in other languages when finding `mid`. In JS use `Math.floor(left + (right - left) / 2)`.
- **Always** make sure the array is sorted before applying Binary Search.

---

## 3. Recursion & Backtracking
**📖 Definition:**
- **Recursion:** A function that calls itself until it reaches a defined Base Case.
- **Backtracking:** An algorithmic technique for solving problems recursively by trying to build a solution incrementally, one piece at a time, removing those solutions that fail to satisfy system constraints.

**💻 Example:**
```javascript
function factorial(n) {
  if (n <= 1) return 1; // Base case
  return n * factorial(n - 1); // Recursive case
}
```

**💡 Additional Information:**
- Highly useful for traversing Trees/Graphs, Generating Permutations, and solving puzzles (like Sudoku or N-Queens).

**⚠️ Things to Keep in Mind:**
- **Stack Overflow:** Too many recursive calls will exceed the maximum call stack size in JS.
- Always establish a **Base Case** first to stop the recursion.

---

## 4. Dynamic Programming (DP)
**📖 Definition:**
An optimization technique to solve complex problems by breaking them down into simpler subproblems, and storing the results of those subproblems to avoid redundant computation.
- **Memoization (Top-Down):** Recursion + caching results.
- **Tabulation (Bottom-Up):** Iterative + filling up an array/table from the base cases.

**💻 Example:**
```javascript
// Memoized Fibonacci
const memo = {};
function fib(n) {
  if (n <= 1) return n;
  if (n in memo) return memo[n];
  memo[n] = fib(n - 1) + fib(n - 2);
  return memo[n];
}
```

**💡 Additional Information:**
- DP is strictly for problems that exhibit **Optimal Substructure** (can be broken down) and **Overlapping Subproblems** (same math done multiple times).
- Reduces exponential time algorithms O(2^N) down to polynomial time O(N).

**⚠️ Things to Keep in Mind:**
- If you see a problem asking for the "Max", "Min", "Longest", or "Total ways" and the inputs are relatively small, it's highly likely DP.

---

## 5. Greedy Algorithms
**📖 Definition:**
An algorithmic paradigm that builds up a solution piece by piece, always choosing the next piece that offers the most immediate and obvious benefit (the local optimum).

**💻 Example:**
```javascript
// E.g., making change for $0.26 optimally:
// Greedily pick largest coin possible:
// $0.25 x 1
// $0.01 x 1
```

**💡 Additional Information:**
- Often structurally simpler and faster than DP, but they **only work** if the problem guarantees that making local optimal choices leads to a global optimal solution (e.g., Dijkstra's Algorithm, Activity Selection).

**⚠️ Things to Keep in Mind:**
- Greedy algorithms don't re-evaluate previous choices. Thus, they might fail on problems where DP succeeds (like making change with weird coin denominations, e.g., 1, 3, 4 to make 6).
- Validating whether a Greedy approach works often requires a mathematical proof.

---

## 6. Two Pointers & Sliding Window
**📖 Definition:**
Techniques usually used on Arrays or strings to process subsets iteratively without brute-forcing.
- **Two Pointers:** Moving two indices (usually left and right, or slow and fast) across an array simultaneously.
- **Sliding Window:** Maintaining a "window" of array elements between a `left` and `right` pointer, expanding and shrinking it as you iterate.

**💻 Example:**
```javascript
// Sliding Window for Max Sum Subarray of size K
let maxSum = 0, windowSum = 0;
// expand right, shrink left to keep window size == K
```

**💡 Additional Information:**
- Time Complexity: Usually reduces an O(N²) nested loop down to an O(N) single pass.
- Sliding Window is perfect for finding "longest/shortest subarray or substring" that meets specific conditions.

**⚠️ Things to Keep in Mind:**
- Be very careful with index out-of-bounds errors.
- Ensure you understand *when* to expand `right` and *when* to contract `left` during sliding window problems.
