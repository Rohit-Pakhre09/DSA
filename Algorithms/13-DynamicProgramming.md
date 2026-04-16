# 13 — Dynamic Programming

> **Breaking complex problems into overlapping subproblems and caching results to avoid redundant work.**

---

## 📖 Definition

**Dynamic Programming (DP)** is an algorithmic technique for solving optimization problems by:

1. Breaking the problem into **overlapping subproblems**
2. **Storing** (memoizing) results of subproblems
3. **Reusing** cached results instead of recomputing

**When to use DP?**

- Problem asks for **maximum/minimum** value, **count** of ways, or **true/false** feasibility
- Has **overlapping subproblems** (same subproblem solved multiple times)
- Has **optimal substructure** (optimal solution contains optimal subsolutions)

---

## 🖼️ Two Approaches

```
Top-Down (Memoization)           Bottom-Up (Tabulation)
────────────────────────         ──────────────────────────
Start with original problem      Start from base cases
Recurse + cache results          Fill a table iteratively
Uses a memo object/map           Uses an array/matrix

fib(5)                           table[0]=0  table[1]=1
 ├─ fib(4) ─── CACHED            table[2]=table[1]+table[0]=1
 │   ├─ fib(3) ─── CACHED        table[3]=table[2]+table[1]=2
 │   │   ├─ fib(2) ─── CACHED    table[4]=table[3]+table[2]=3
 │   │   │   ├─ fib(1)=1         table[5]=table[4]+table[3]=5
 │   │   │   └─ fib(0)=0
 │   │   └─ fib(1)=1
 │   └─ fib(2) ────────── ✅ return from cache!
 └─ fib(3) ────────────── ✅ return from cache!
```

---

## 💻 Classic Example: Fibonacci

```javascript
// ❌ Naive recursion — O(2^n)
function fibNaive(n) {
  if (n <= 1) return n;
  return fibNaive(n - 1) + fibNaive(n - 2); // computes same values MANY times
}

// ✅ Top-Down (Memoization) — O(n) time, O(n) space
function fibMemo(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n]; // cache hit!
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// ✅ Bottom-Up (Tabulation) — O(n) time, O(n) space
function fibTab(n) {
  if (n <= 1) return n;
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}

// ✅ Optimized — O(n) time, O(1) space
function fibOpt(n) {
  if (n <= 1) return n;
  let [a, b] = [0, 1];
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}
// fib(10) = 55, fib(50) works instantly (vs fib(50) naive = 2^50 calls!)
```

---

## 🔥 DP Problem Patterns

### Pattern 1: 1D DP (Linear)

**Climbing Stairs (LeetCode #70)**

```javascript
// n stairs, take 1 or 2 steps — how many ways?
function climbStairs(n) {
  // dp[i] = ways to reach step i
  // dp[i] = dp[i-1] (came from step i-1) + dp[i-2] (came from step i-2)
  if (n <= 2) return n;
  let [a, b] = [1, 2]; // dp[1]=1, dp[2]=2
  for (let i = 3; i <= n; i++) [a, b] = [b, a + b];
  return b;
}
// n=5 → dp = [_, 1, 2, 3, 5, 8] → 8 ways
/*
Recurrence: dp[n] = dp[n-1] + dp[n-2]  (same as Fibonacci!)
Base cases: dp[1]=1, dp[2]=2
*/
```

**House Robber (LeetCode #198)**

```javascript
// Rob houses in a row, can't rob adjacent — maximize loot
function rob(nums) {
  // dp[i] = max loot from houses 0..i
  // dp[i] = max(dp[i-1], nums[i] + dp[i-2])
  //         ^skip house i    ^rob house i
  if (nums.length === 1) return nums[0];
  let [prev2, prev1] = [0, 0];
  for (let num of nums) {
    const curr = Math.max(prev1, num + prev2);
    [prev2, prev1] = [prev1, curr];
  }
  return prev1;
}
// [2,7,9,3,1] → rob houses 0,2,4 = 2+9+1 = 12

/*
dp trace:
nums = [2, 7, 9, 3, 1]
prev2=0, prev1=0
num=2: curr=max(0, 2+0)=2   prev2=0, prev1=2
num=7: curr=max(2, 7+0)=7   prev2=2, prev1=7
num=9: curr=max(7, 9+2)=11  prev2=7, prev1=11
num=3: curr=max(11,3+7)=11  prev2=11, prev1=11
num=1: curr=max(11,1+11)=12 prev2=11, prev1=12 ✅
*/
```

---

### Pattern 2: 2D DP (Grid/Matrix)

**Unique Paths (LeetCode #62)**

```javascript
// Grid m×n, move only right or down, how many paths from top-left to bottom-right?
function uniquePaths(m, n) {
  // dp[r][c] = number of ways to reach cell (r,c)
  // dp[r][c] = dp[r-1][c] + dp[r][c-1]  (came from above or left)
  const dp = Array.from({ length: m }, () => new Array(n).fill(1));
  // Top row and left column all = 1 (only one way to reach them)

  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
    }
  }
  return dp[m - 1][n - 1];
}
// m=3, n=7 → 28

/*
Grid visualization (3×3):
┌───┬───┬───┐
│ 1 │ 1 │ 1 │  ← top row: only 1 way (go right)
├───┼───┼───┤
│ 1 │ 2 │ 3 │  ← 2 = 1+1, 3 = 2+1
├───┼───┼───┤
│ 1 │ 3 │ 6 │  ← 3 = 1+2, 6 = 3+3  ← answer: 6
└───┴───┴───┘
*/
```

**Minimum Path Sum**

```javascript
// Grid with costs, find path with minimum total cost (right or down only)
function minPathSum(grid) {
  const m = grid.length,
    n = grid[0].length;
  const dp = Array.from({ length: m }, (_, r) => [...grid[r]]);

  // Fill first row (can only come from left)
  for (let c = 1; c < n; c++) dp[0][c] += dp[0][c - 1];
  // Fill first col (can only come from above)
  for (let r = 1; r < m; r++) dp[r][0] += dp[r - 1][0];

  for (let r = 1; r < m; r++)
    for (let c = 1; c < n; c++)
      dp[r][c] += Math.min(dp[r - 1][c], dp[r][c - 1]);

  return dp[m - 1][n - 1];
}
// [[1,3,1],[1,5,1],[4,2,1]] → 7  (path: 1→3→1→1→1)
```

---

### Pattern 3: Knapsack (Include/Exclude)

**0/1 Knapsack**

```javascript
// Items with weights & values, bag capacity W — maximize value
function knapsack(weights, values, W) {
  const n = weights.length;
  // dp[i][w] = max value using first i items with capacity w
  const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const wt = weights[i - 1],
      val = values[i - 1];
    for (let w = 0; w <= W; w++) {
      if (wt > w) {
        dp[i][w] = dp[i - 1][w]; // can't include item i
      } else {
        dp[i][w] = Math.max(
          dp[i - 1][w], // exclude item i
          dp[i - 1][w - wt] + val, // include item i
        );
      }
    }
  }
  return dp[n][W];
}
// weights=[1,3,4,5], values=[1,4,5,7], W=7 → 9

/*
Decision tree at each item: include (if fits) OR exclude
dp table:
     w=0  1   2   3   4   5   6   7
i=0:  0   0   0   0   0   0   0   0
i=1:  0   1   1   1   1   1   1   1  (item wt=1, val=1)
i=2:  0   1   1   4   5   5   5   5  (item wt=3, val=4)
i=3:  0   1   1   4   5   6   6   9  (item wt=4, val=5)
i=4:  0   1   1   4   5   7   8   9  (item wt=5, val=7)
Answer: dp[4][7] = 9 ✅
*/
```

**Coin Change (LeetCode #322)**

```javascript
// Minimum coins to make amount
function coinChange(coins, amount) {
  // dp[i] = min coins needed to make amount i
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // base case: 0 coins for amount 0

  for (let amt = 1; amt <= amount; amt++) {
    for (let coin of coins) {
      if (coin <= amt) {
        dp[amt] = Math.min(dp[amt], 1 + dp[amt - coin]);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
// coins=[1,5,6,9], amount=11 → 2 (5+6)

/*
dp[0]=0
dp[1]=min(dp[0]+1)=1     (1 coin of 1)
dp[5]=min(dp[4]+1, dp[0]+1)=1  (1 coin of 5)
dp[6]=min(dp[5]+1, dp[0]+1)=1  (1 coin of 6)
dp[11]=min(dp[10]+1, dp[6]+1, dp[5]+1, dp[2]+1)=2  (6+5 ✅)
*/
```

---

### Pattern 4: Longest Subsequence

**Longest Common Subsequence (LCS)**

```javascript
// LCS of "abcde" and "ace" = "ace" (length 3)
function lcs(s1, s2) {
  const m = s1.length,
    n = s2.length;
  // dp[i][j] = LCS length of s1[0..i-1] and s2[0..j-1]
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1]; // chars match — extend LCS
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // skip one char
      }
    }
  }
  return dp[m][n];
}
// "abcde", "ace" → 3

/*
    ""  a  c  e
""   0  0  0  0
a    0  1  1  1
b    0  1  1  1
c    0  1  2  2
d    0  1  2  2
e    0  1  2  3  ← answer
*/
```

**Longest Increasing Subsequence (LIS)**

```javascript
// O(n²) DP
function lengthOfLIS(nums) {
  const n = nums.length;
  const dp = new Array(n).fill(1); // each element is LIS of length 1

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
}
// [10,9,2,5,3,7,101,18] → 4  ([2,3,7,101])

// O(n log n) with binary search patience sorting:
function lengthOfLIS_Fast(nums) {
  const tails = []; // tails[i] = smallest tail of all IS of length i+1

  for (let num of nums) {
    let lo = 0,
      hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < num) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = num; // replace or extend
  }
  return tails.length;
}
```

---

### Pattern 5: String DP

**Edit Distance (Levenshtein)**

```javascript
// Min operations (insert, delete, replace) to convert word1 to word2
function minDistance(word1, word2) {
  const m = word1.length,
    n = word2.length;
  // dp[i][j] = edit distance between word1[0..i-1] and word2[0..j-1]
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  // Base: dp[0][j]=j (insert j chars), dp[i][0]=i (delete i chars)

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // no operation needed
      } else {
        dp[i][j] =
          1 +
          Math.min(
            dp[i - 1][j], // delete from word1
            dp[i][j - 1], // insert into word1
            dp[i - 1][j - 1], // replace in word1
          );
      }
    }
  }
  return dp[m][n];
}
// "horse" → "ros" = 3 operations
```

---

## 💡 Real-World Usage

| Application | Pattern | Usage |
| :--- | :--- | :--- |
| **Version Control (Git)** | String DP (LCS) | `git diff` computes the Longest Common Subsequence to determine which lines were added or removed. |
| **Spell Checking** | Edit Distance | Search engines use Levenshtein distance to suggest "Did you mean: X?" for typos. |
| **Financial Modeling** | Optimization DP | Actuaries compute combinations of probabilities over risk paths via caching overlapping grids. |
| **Network Routing** | Bellman-Ford | Dynamic programming approach for finding shortest paths dealing with negative edges in networks. |

---

## 🎯 Interview Questions

### 🔥 Q1: Partition Equal Subset Sum

```javascript
// Can array be split into two subsets with equal sum?
function canPartition(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;
  const target = total / 2;

  const dp = new Array(target + 1).fill(false);
  dp[0] = true; // can always make sum 0 (empty subset)

  for (let num of nums) {
    for (let j = target; j >= num; j--) {
      // iterate backwards!
      dp[j] = dp[j] || dp[j - num];
    }
  }
  return dp[target];
}
// [1,5,11,5] → true (subset [1,5,5] and [11])
// [1,2,3,5] → false
```

### 🔥 Q2: Word Break

```javascript
// Can string s be segmented using words from wordDict?
function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true; // empty string is always valid

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}
// s="leetcode", dict=["leet","code"] → true
// s="catsandog", dict=["cats","dog","sand","and","cat"] → false
```

### 🔥 Q3: Decode Ways

```javascript
// '1'-'26' → 'A'-'Z'. Count decodings of numeric string.
function numDecodings(s) {
  if (!s || s[0] === "0") return 0;
  const n = s.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1; // empty string: 1 way
  dp[1] = 1; // first char (non-zero): 1 way

  for (let i = 2; i <= n; i++) {
    const one = Number(s[i - 1]); // single digit
    const two = Number(s.slice(i - 2, i)); // two digits

    if (one >= 1) dp[i] += dp[i - 1]; // valid single
    if (two >= 10 && two <= 26) dp[i] += dp[i - 2]; // valid double
  }
  return dp[n];
}
// "226" → 3 ("2 2 6", "22 6", "2 26")
// "06"  → 0 (leading zero invalid)
```

---

## 🖼️ DP Problem Recognition Guide

```
Problem says:            Think about:
──────────────────────── ─────────────────────────────────
"maximum/minimum"       → Optimization DP (knapsack, grid)
"count ways"            → Combinatorial DP (stairs, paths)
"can we achieve X"      → Boolean DP (partition, word break)
"subsequence"           → LCS, LIS patterns
"substring"             → String DP with i,j indices
"partition into groups" → Knapsack variant
"at most K"             → Add K as a DP dimension
```

---

## ⚡ Practice Problems

| #   | Problem                        | Difficulty | Pattern            |
| --- | ------------------------------ | ---------- | ------------------ |
| 1   | Climbing Stairs                | Easy       | 1D DP              |
| 2   | House Robber                   | Easy       | 1D DP              |
| 3   | Unique Paths                   | Medium     | 2D DP              |
| 4   | Coin Change                    | Medium     | Unbounded Knapsack |
| 5   | Longest Increasing Subsequence | Medium     | LIS                |
| 6   | Word Break                     | Medium     | String DP          |
| 7   | Decode Ways                    | Medium     | 1D DP              |
| 8   | Partition Equal Subset Sum     | Medium     | 0/1 Knapsack       |
| 9   | Edit Distance                  | Hard       | String DP          |
| 10  | Burst Balloons                 | Hard       | Interval DP        |
| 11  | Regular Expression Matching    | Hard       | 2D String DP       |
| 12  | Longest Common Subsequence     | Medium     | 2D DP              |

---

## ⚠️ Common Mistakes

```javascript
// ❌ Wrong iteration order in 0/1 knapsack (space-optimized)
for (let num of nums) {
  for (let j = 0; j <= target; j++) {
    // forward = unbounded knapsack!
    dp[j] = dp[j] || dp[j - num];
  }
}
// ✅ Iterate BACKWARDS for 0/1 (each item used at most once)
for (let num of nums) {
  for (let j = target; j >= num; j--) {
    // backwards = 0/1 knapsack ✅
    dp[j] = dp[j] || dp[j - num];
  }
}

// ❌ Wrong base case
const dp = new Array(n).fill(0); // missing dp[0]
// ✅ Always initialize base cases carefully
const dp = new Array(n + 1).fill(0);
dp[0] = 1; // most problems need this

// ❌ Not thinking about the recurrence relation first
// ✅ Always define dp[i] clearly before coding
// "dp[i] = maximum profit using first i items"
// Then derive: dp[i] = max(dp[i-1], something + dp[i-k])
```

---

**← Previous:** [12 — Recursion](./12-Recursion.md) | **Next →** [14 — Greedy](./14-Greedy.md)
