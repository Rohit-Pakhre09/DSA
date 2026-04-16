# 02 — Arrays

> **The most fundamental data structure — a contiguous block of memory holding elements of the same type.**

---

## 📖 Definition

An **Array** is an ordered collection of elements stored at **contiguous memory locations**, accessible via a numeric **index** starting at 0.

```
Index:   0    1    2    3    4
       ┌────┬────┬────┬────┬────┐
Value: │ 10 │ 20 │ 30 │ 40 │ 50 │
       └────┴────┴────┴────┴────┘
Memory: 100  104  108  112  116   (each int = 4 bytes)

Access arr[3] → Memory address = base(100) + 3 × 4 = 112 → value 40
```

### JavaScript Arrays vs True Arrays

JavaScript arrays are **dynamic** and **heterogeneous** (unlike C/Java):

```javascript
const arr = [1, "hello", true, null, { x: 2 }]; // mixed types — JS allows it
arr.push(99); // grows dynamically
```

Under the hood, V8 (Node/Chrome) optimizes arrays of the same type using actual contiguous memory (fast path). Mixed types use a slower hash-map-like structure.

---

## 🖼️ Memory Layout

```
Static Array (C-style, fixed):
┌───┬───┬───┬───┬───┐
│ 5 │ 3 │ 8 │ 1 │ 9 │   Fixed size — can't grow
└───┴───┴───┴───┴───┘
 [0] [1] [2] [3] [4]

Dynamic Array (JS / Python list):
┌───┬───┬───┬───┬───┬───┬───┬───┐
│ 5 │ 3 │ 8 │ 1 │ 9 │   │   │   │   Allocated capacity = 8
└───┴───┴───┴───┴───┴───┴───┴───┘
 [0] [1] [2] [3] [4]  ↑ empty slots (length = 5, capacity = 8)

When array is full → allocate 2× capacity, copy all → O(n) rarely
Amortized push = O(1)
```

---

## 📊 Complexity Reference

| Operation                     | Time     | Notes            |
| ----------------------------- | -------- | ---------------- |
| Access `arr[i]`               | O(1)     | Direct index     |
| Search (unsorted)             | O(n)     | Must scan all    |
| Search (sorted)               | O(log n) | Binary search    |
| Insert at end `push`          | O(1)\*   | \*Amortized      |
| Insert at beginning `unshift` | O(n)     | Shifts all right |
| Insert at middle              | O(n)     | Shifts elements  |
| Delete at end `pop`           | O(1)     |                  |
| Delete at beginning `shift`   | O(n)     | Shifts all left  |
| Delete at middle              | O(n)     | Shifts elements  |

---

## 💻 JavaScript Array Implementation & Methods

### Creation

```javascript
// Ways to create arrays
const arr1 = [1, 2, 3, 4, 5];
const arr2 = new Array(5); // [empty × 5]
const arr3 = new Array(5).fill(0); // [0, 0, 0, 0, 0]
const arr4 = Array.from({ length: 5 }, (_, i) => i); // [0,1,2,3,4]
const arr5 = [...arr1]; // shallow copy
```

### Essential Methods with Complexity

```javascript
const arr = [3, 1, 4, 1, 5, 9, 2, 6];

// O(1) operations
arr.push(7); // [3,1,4,1,5,9,2,6,7]  — add to end
arr.pop(); // removes & returns 7   — remove from end
arr[0]; // 3                     — access by index
arr.length; // 8

// O(n) operations
arr.shift(); // removes & returns 3   — remove from front
arr.unshift(0); // [0,1,4,1,5,9,2,6]    — add to front
arr.indexOf(5); // 4                     — find index (linear scan)
arr.includes(9); // true                  — linear scan
arr.splice(2, 1); // removes 1 element at index 2
arr.splice(2, 0, 99); // inserts 99 at index 2

// O(n) — create new array
const doubled = arr.map((x) => x * 2);
const evens = arr.filter((x) => x % 2 === 0);
const sum = arr.reduce((acc, x) => acc + x, 0);
const flat = [
  [1, 2],
  [3, 4],
].flat(); // [1,2,3,4]
const flatMapped = [[1], [2]].flatMap((x) => [x[0], x[0] * 2]); // [1,2,2,4]

// O(n log n) — sort
arr.sort((a, b) => a - b); // ✅ ascending numeric
arr.sort((a, b) => b - a); // descending
arr.sort(); // ⚠️ sorts as strings! '10' < '9'

// Slicing — O(k) where k = slice size
const sub = arr.slice(1, 4); // new array, indices 1-3 (end exclusive)

// Spread & destructuring
const [first, second, ...rest] = arr;
const combined = [...arr1, ...arr2];
```

### 2D Arrays (Matrix)

```javascript
// Create n×m matrix filled with 0
const matrix = Array.from({ length: 3 }, () => Array(4).fill(0));
/*
┌──────────────┐
│ 0  0  0  0  │  row 0
│ 0  0  0  0  │  row 1
│ 0  0  0  0  │  row 2
└──────────────┘
*/

// Access: matrix[row][col]
matrix[1][2] = 5; // set row 1, col 2

// Traverse matrix
for (let r = 0; r < matrix.length; r++) {
  for (let c = 0; c < matrix[0].length; c++) {
    console.log(matrix[r][c]);
  }
}
```

---

## 💡 Real-World Usage

| Application            | How Arrays Are Used                                       |
| ---------------------- | --------------------------------------------------------- |
| **Image Processing**   | Pixels stored as 2D array of RGB values                   |
| **Video Frames**       | Each frame = 3D array [height][width][RGB]                |
| **Excel Spreadsheet**  | 2D array of cells                                         |
| **Music Streaming**    | Audio waveform as array of amplitude samples              |
| **Database Table**     | Rows stored as array of records                           |
| **Game Board (Chess)** | 8×8 2D array                                              |
| **Browser DOM**        | `document.querySelectorAll()` returns array-like NodeList |

---

## 🔥 Core Patterns & Algorithms

### Pattern 1: Two Pointers

```javascript
// Reverse an array in-place — O(n) time, O(1) space
function reverse(arr) {
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]]; // swap
    left++;
    right--;
  }
  return arr;
}
// [1,2,3,4,5] → [5,4,3,2,1]

/*
Step 1: ← L=0, R=4 →   [1,2,3,4,5]  swap 1↔5
Step 2: ← L=1, R=3 →   [5,2,3,4,1]  swap 2↔4
Step 3:   L=2 R=2       [5,4,3,2,1]  L==R, stop
*/
```

### Pattern 2: Prefix Sum

```javascript
// Pre-compute cumulative sums for fast range queries
function buildPrefixSum(arr) {
  const prefix = [0]; // prefix[0] = 0
  for (let i = 0; i < arr.length; i++) {
    prefix.push(prefix[i] + arr[i]);
  }
  return prefix;
}

// Range sum query: sum(L, R) = prefix[R+1] - prefix[L]
function rangeSum(prefix, L, R) {
  return prefix[R + 1] - prefix[L]; // O(1) after O(n) build
}

// Example:
// arr    = [2, 4, 3, 1, 6]
// prefix = [0, 2, 6, 9,10,16]
// sum(1,3) = prefix[4] - prefix[1] = 10 - 2 = 8  ✅ (4+3+1=8)
```

### Pattern 3: Kadane's Algorithm (Maximum Subarray)

```javascript
// Find contiguous subarray with largest sum — O(n)
function maxSubArray(arr) {
  let maxSum = arr[0];
  let currentSum = arr[0];

  for (let i = 1; i < arr.length; i++) {
    // Either extend the previous subarray or start fresh
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}

// Example: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// Answer: 6  (subarray [4,-1,2,1])
/*
Trace:
i=0: curr=-2, max=-2
i=1: curr=max(1,-2+1)=max(1,-1)=1,   max=1
i=2: curr=max(-3,1-3)=max(-3,-2)=-2, max=1
i=3: curr=max(4,-2+4)=max(4,2)=4,    max=4
i=4: curr=max(-1,4-1)=max(-1,3)=3,   max=4
i=5: curr=max(2,3+2)=max(2,5)=5,     max=5
i=6: curr=max(1,5+1)=max(1,6)=6,     max=6  ← answer
*/
```

### Pattern 4: Dutch National Flag (3-way Partition)

```javascript
// Sort array of 0s, 1s, 2s in one pass — O(n), O(1)
function sortColors(arr) {
  let low = 0,
    mid = 0,
    high = arr.length - 1;
  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low++;
      mid++;
    } else if (arr[mid] === 1) {
      mid++;
    } else {
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--;
    }
  }
  return arr;
}
// [2,0,2,1,1,0] → [0,0,1,1,2,2]
```

---

## 🎯 Interview Questions

### 🔥 Q1: Remove Duplicates from Sorted Array (In-place)

```javascript
// LeetCode #26 — O(n) time, O(1) space
function removeDuplicates(arr) {
  if (!arr.length) return 0;
  let uniqueIdx = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[uniqueIdx]) {
      uniqueIdx++;
      arr[uniqueIdx] = arr[i];
    }
  }
  return uniqueIdx + 1; // length of unique portion

  /*
  [1,1,2,3,3,4]
  uniqueIdx=0 (points to 1)
  i=1: arr[1]=1=arr[0]  → skip
  i=2: arr[2]=2≠arr[0]  → uniqueIdx=1, arr[1]=2
  i=3: arr[3]=3≠arr[1]  → uniqueIdx=2, arr[2]=3
  i=4: arr[4]=3=arr[2]  → skip
  i=5: arr[5]=4≠arr[2]  → uniqueIdx=3, arr[3]=4
  Result: [1,2,3,4, ...] with length 4
  */
}
```

### 🔥 Q2: Product of Array Except Self

```javascript
// LeetCode #238 — O(n) time, O(1) extra space (excluding output)
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  // Left pass: result[i] = product of all elements to the LEFT of i
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];
  }

  // Right pass: multiply by product of all elements to the RIGHT
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return result;
}
// [1,2,3,4] → [24,12,8,6]
// result[0] = (nothing left) × (2×3×4) = 24
// result[1] = 1 × (3×4) = 12
// result[2] = (1×2) × 4 = 8
// result[3] = (1×2×3) × (nothing right) = 6
```

### 🔥 Q3: Rotate Array by k Steps

```javascript
// LeetCode #189 — O(n) time, O(1) space
function rotate(nums, k) {
  k = k % nums.length; // handle k > length
  reverse(nums, 0, nums.length - 1); // reverse entire array
  reverse(nums, 0, k - 1); // reverse first k
  reverse(nums, k, nums.length - 1); // reverse rest

  function reverse(arr, start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }
}
// [1,2,3,4,5,6,7], k=3
// Step 1 reverse all:   [7,6,5,4,3,2,1]
// Step 2 reverse [0,2]: [5,6,7,4,3,2,1]
// Step 3 reverse [3,6]: [5,6,7,1,2,3,4] ✅
```

### 🔥 Q4: Find Missing Number

```javascript
// O(n) time, O(1) space using Gauss formula
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2; // Gauss: 0+1+2+...+n
  const actualSum = nums.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}
// [3,0,1] → expectedSum=6, actualSum=4, missing=2
```

### Q5: Spiral Matrix Traversal

```javascript
// LeetCode #54
function spiralOrder(matrix) {
  const result = [];
  let top = 0,
    bottom = matrix.length - 1;
  let left = 0,
    right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // Traverse right
    for (let c = left; c <= right; c++) result.push(matrix[top][c]);
    top++;
    // Traverse down
    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);
    right--;
    // Traverse left
    if (top <= bottom) {
      for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);
      bottom--;
    }
    // Traverse up
    if (left <= right) {
      for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);
      left++;
    }
  }
  return result;
}
/*
Matrix:
1  2  3
4  5  6
7  8  9
Result: [1,2,3,6,9,8,7,4,5]  →  →  ↓  ↓  ←  ←  ↑  ↑  →
*/
```

---

## ⚡ Practice Problems

| #   | Problem                              | Difficulty | Key Technique        |
| --- | ------------------------------------ | ---------- | -------------------- |
| 1   | Two Sum                              | Easy       | Hash Map             |
| 2   | Best Time to Buy/Sell Stock          | Easy       | One pass, track min  |
| 3   | Contains Duplicate                   | Easy       | Set                  |
| 4   | Maximum Subarray                     | Medium     | Kadane's             |
| 5   | 3Sum                                 | Medium     | Sort + Two Pointers  |
| 6   | Container With Most Water            | Medium     | Two Pointers         |
| 7   | Find Minimum in Rotated Sorted Array | Medium     | Binary Search        |
| 8   | Search in Rotated Sorted Array       | Medium     | Binary Search        |
| 9   | Trapping Rain Water                  | Hard       | Stack / Two Pointers |
| 10  | Sliding Window Maximum               | Hard       | Deque                |

---

## ⚠️ Common Mistakes

```javascript
// ❌ Sorting numbers without comparator
[10, 9, 2, 100].sort(); // [10, 100, 2, 9] — lexicographic! WRONG
[10, 9, 2, 100].sort((a, b) => a - b); // [2, 9, 10, 100] ✅

// ❌ Shallow copy issues
const a = [
  [1, 2],
  [3, 4],
];
const b = [...a]; // shallow copy
b[0].push(99); // mutates a[0] too! 😱
// ✅ Deep copy
const c = a.map((row) => [...row]);

// ❌ arr.indexOf() for objects — compares by reference
const arr = [{ a: 1 }, { a: 2 }];
arr.indexOf({ a: 1 }); // -1! Objects compared by reference

// ❌ Modifying array while iterating
const arr2 = [1, 2, 3, 4, 5];
for (let i = 0; i < arr2.length; i++) {
  if (arr2[i] % 2 === 0) arr2.splice(i, 1); // skips elements!
}
// ✅ Iterate backwards when removing
for (let i = arr2.length - 1; i >= 0; i--) {
  if (arr2[i] % 2 === 0) arr2.splice(i, 1);
}
```

---

**← Previous:** [01 — Big-O](../Prerequisites/01-BigO.md) | **Next →** [03 — Strings](./03-Strings.md)
