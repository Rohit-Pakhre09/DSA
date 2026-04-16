# 12 — Recursion & Backtracking

> **Solving problems by reducing them to smaller versions of themselves — and exploring all possibilities.**

---

## 📖 Recursion Definition

**Recursion** is when a function calls itself with a smaller/simpler input until it reaches a **base case**.

Every recursive solution needs:

1. **Base Case** — when to stop (prevents infinite recursion)
2. **Recursive Case** — reduce problem, call self
3. **Progress** — each call must move toward the base case

---

## 🖼️ Call Stack Visualization

```javascript
function factorial(n) {
  if (n === 0) return 1;        // base case
  return n * factorial(n - 1);  // recursive case
}
factorial(4);

Call Stack:
┌─────────────────────┐
│ factorial(0) = 1    │ ← base case returns
├─────────────────────┤
│ factorial(1) = 1×1  │ ← returns 1
├─────────────────────┤
│ factorial(2) = 2×1  │ ← returns 2
├─────────────────────┤
│ factorial(3) = 3×2  │ ← returns 6
├─────────────────────┤
│ factorial(4) = 4×6  │ ← returns 24  ✅
└─────────────────────┘
```

---

## 🔥 Backtracking

**Backtracking** = DFS + "undo" — explore all possibilities, abandon invalid paths early.

```
Make a choice → Explore → Undo the choice

Decision tree for subsets of [1,2,3]:
                    []
               /    |    \
             [1]   [2]   [3]
            /  \     \
         [1,2] [1,3] [2,3]
           |
        [1,2,3]
```

### Universal Backtracking Template

```javascript
function backtrack(result, current, start, nums) {
  result.push([...current]); // or add only at base case

  for (let i = start; i < nums.length; i++) {
    // 1. Choose
    current.push(nums[i]);
    // 2. Explore
    backtrack(result, current, i + 1, nums);
    // 3. Un-choose (backtrack)
    current.pop();
  }
}
```

---

## 💻 Core Problems

### All Subsets — O(2ⁿ)

```javascript
function subsets(nums) {
  const result = [];
  function bt(start, current) {
    result.push([...current]);
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      bt(i + 1, current);
      current.pop();
    }
  }
  bt(0, []);
  return result;
}
// [1,2,3] → [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]
```

### All Permutations — O(n×n!)

```javascript
function permute(nums) {
  const result = [];
  function bt(current, remaining) {
    if (!remaining.length) {
      result.push([...current]);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      current.push(remaining[i]);
      bt(current, [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
      current.pop();
    }
  }
  bt([], nums);
  return result;
}
// [1,2,3] → [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

### Combination Sum — O(2ⁿ)

```javascript
function combinationSum(candidates, target) {
  const result = [];
  candidates.sort((a, b) => a - b);
  function bt(start, current, remaining) {
    if (remaining === 0) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) break; // pruning!
      current.push(candidates[i]);
      bt(i, current, remaining - candidates[i]); // i not i+1 (can reuse)
      current.pop();
    }
  }
  bt(0, [], target);
  return result;
}
// candidates=[2,3,6,7], target=7 → [[2,2,3],[7]]
```

### N-Queens — O(n!)

```javascript
function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => Array(n).fill("."));
  const cols = new Set(),
    diag1 = new Set(),
    diag2 = new Set();

  function bt(row) {
    if (row === n) {
      result.push(board.map((r) => r.join("")));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col))
        continue;
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);
      board[row][col] = "Q";
      bt(row + 1);
      board[row][col] = ".";
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }
  bt(0);
  return result;
}
```

---

## 💡 Real-World Usage

| Application | Usage |
| :--- | :--- |
| **Filesystem Traversal** | Deeply scanning folders and sub-folders recursively down to individual files. |
| **DOM Traversal** | Searching or manipulating deeply nested HTML nodes (e.g., recursive child parsing). |
| **JSON Serialization** | Parsing nested objects, arrays, and data structures. |
| **Compilers/Parsers** | Recursive Descent Parsing to evaluate mathematical expressions or abstract syntax trees. |

---

## 🎯 Interview Questions

### 🔥 Word Search in Grid

```javascript
function exist(board, word) {
  const m = board.length,
    n = board[0].length;
  function dfs(r, c, idx) {
    if (idx === word.length) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[idx])
      return false;
    const temp = board[r][c];
    board[r][c] = "#"; // mark visited
    const found =
      dfs(r + 1, c, idx + 1) ||
      dfs(r - 1, c, idx + 1) ||
      dfs(r, c + 1, idx + 1) ||
      dfs(r, c - 1, idx + 1);
    board[r][c] = temp; // restore
    return found;
  }
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++) if (dfs(r, c, 0)) return true;
  return false;
}
```

---

## ⚡ Practice Problems

| #   | Problem                   | Difficulty |
| --- | ------------------------- | ---------- |
| 1   | Subsets                   | Medium     |
| 2   | Permutations              | Medium     |
| 3   | Combination Sum           | Medium     |
| 4   | Word Search               | Medium     |
| 5   | Palindrome Partitioning   | Medium     |
| 6   | Letter Combinations Phone | Medium     |
| 7   | N-Queens                  | Hard       |
| 8   | Sudoku Solver             | Hard       |

---

## ⚠️ Common Mistakes

- **Missing or Unreachable Base Case**: This will instantly result in `Maximum call stack size exceeded` errors. Make sure your conditions strictly decrease toward the base case!
- **Not Returning Recursive Calls**: `return dfs(node.left)` instead of just `dfs(node.left)`. If you don't return the recursive call, the base case value will get lost and bubble up as `undefined`!
- **Pushing References to Result Arrays**: In Backtracking, if you do `result.push(current)` instead of `result.push([...current])`, your final 2D array will just contain `N` copies of the final state of `current` (which is often empty)! 

---

**← Previous:** [11 — Searching](./11-Searching.md) | **Next →** [13 — Dynamic Programming](./13-DynamicProgramming.md)
