# 10 — Sorting Algorithms

> **The classic problem that teaches divide-and-conquer, recursion, and algorithm analysis.**

---

## 🖼️ Sorting Algorithm Comparison

```
Algorithm       | Best      | Average   | Worst     | Space | Stable?
────────────────┼───────────┼───────────┼───────────┼───────┼────────
Bubble Sort     | O(n)      | O(n²)     | O(n²)     | O(1)  | ✅ Yes
Selection Sort  | O(n²)     | O(n²)     | O(n²)     | O(1)  | ❌ No
Insertion Sort  | O(n)      | O(n²)     | O(n²)     | O(1)  | ✅ Yes
Merge Sort      | O(n log n)| O(n log n)| O(n log n)| O(n)  | ✅ Yes
Quick Sort      | O(n log n)| O(n log n)| O(n²)     | O(log)| ❌ No
Heap Sort       | O(n log n)| O(n log n)| O(n log n)| O(1)  | ❌ No
Counting Sort   | O(n+k)    | O(n+k)    | O(n+k)    | O(k)  | ✅ Yes
Radix Sort      | O(nk)     | O(nk)     | O(nk)     | O(n+k)| ✅ Yes

Stable: equal elements preserve original relative order
k = range of values
```

---

## 💻 Implementations

### Bubble Sort — O(n²) — Simple but slow

```javascript
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      // -i because last i elements are sorted
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // already sorted → O(n) best case
  }
  return arr;
}

/*
[5, 3, 8, 1, 2]
Pass 1: [3,5,1,2,8]  — 8 bubbles to end
Pass 2: [3,1,2,5,8]  — 5 bubbles to position
Pass 3: [1,2,3,5,8]  — 3 bubbles to position
Pass 4: [1,2,3,5,8]  — no swaps → done!
*/
```

### Insertion Sort — O(n²) — Best for small/nearly sorted arrays

```javascript
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]; // shift right to make room
      j--;
    }
    arr[j + 1] = key; // insert in correct position
  }
  return arr;
}

/*
[5, 3, 8, 1, 2]
i=1: key=3, shift 5 right → [3,5,8,1,2]
i=2: key=8, 5<8 so stop → [3,5,8,1,2]
i=3: key=1, shift 8,5,3 right → [1,3,5,8,2]
i=4: key=2, shift 8,5,3 right → [1,2,3,5,8] ✅
*/
```

### Merge Sort — O(n log n) — Guaranteed, great for linked lists

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid)); // sort left half
  const right = mergeSort(arr.slice(mid)); // sort right half
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}

/*
Divide:
[5,3,8,1,2]
   ↙         ↘
[5,3,8]     [1,2]
 ↙   ↘       ↙  ↘
[5] [3,8]  [1]  [2]
     ↙ ↘
    [3] [8]

Conquer (merge):
[3,8], [5] → [3,5,8]
[1],[2] → [1,2]
[3,5,8],[1,2] → [1,2,3,5,8] ✅

Time: O(n log n) — log n levels, O(n) merge work per level
Space: O(n) — temporary arrays during merge
*/
```

### Quick Sort — O(n log n) avg — Fastest in practice

```javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIdx = partition(arr, low, high);
    quickSort(arr, low, pivotIdx - 1); // sort left of pivot
    quickSort(arr, pivotIdx + 1, high); // sort right of pivot
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high]; // choose last element as pivot
  let i = low - 1; // index of smaller element

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap smaller element left
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // place pivot
  return i + 1; // pivot's final position
}

/*
[5,3,8,1,2] pivot=2
j=0: arr[0]=5 > 2, skip
j=1: arr[1]=3 > 2, skip
j=2: arr[2]=8 > 2, skip
j=3: arr[3]=1 ≤ 2, i=0, swap arr[0]↔arr[3] → [1,3,8,5,2]
Place pivot: swap arr[1]↔arr[4] → [1,2,8,5,3]
Pivot (2) is at index 1. Left=[1], Right=[8,5,3]

Worst case: Already sorted array with last element as pivot
[1,2,3,4,5] → pivot=5 each time → O(n²)!
Fix: Random pivot or median-of-three
*/

// Quick Sort with random pivot — avoids worst case
function quickSortRandom(arr, lo = 0, hi = arr.length - 1) {
  if (lo < hi) {
    // Swap random element with last
    const randIdx = lo + Math.floor(Math.random() * (hi - lo + 1));
    [arr[randIdx], arr[hi]] = [arr[hi], arr[randIdx]];
    const p = partition(arr, lo, hi);
    quickSortRandom(arr, lo, p - 1);
    quickSortRandom(arr, p + 1, hi);
  }
  return arr;
}
```

### Counting Sort — O(n + k) — For integers in small range

```javascript
function countingSort(arr, min = Math.min(...arr), max = Math.max(...arr)) {
  const count = new Array(max - min + 1).fill(0);

  // Count occurrences
  for (let num of arr) count[num - min]++;

  // Reconstruct sorted array
  const result = [];
  for (let i = 0; i < count.length; i++) {
    while (count[i]-- > 0) result.push(i + min);
  }
  return result;
}
// [4,2,2,8,3,3,1] → [1,2,2,3,3,4,8]  k=range=7
// Excellent when k is small (e.g., sort test scores 0-100)
```

### Heap Sort — O(n log n), O(1) space

```javascript
function heapSort(arr) {
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);

  // Extract max one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]; // move max to end
    heapify(arr, i, 0); // restore heap property
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i,
    left = 2 * i + 1,
    right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}
```

---

## 🖼️ When to Use Which Sort?

```
Use Case                         → Algorithm
─────────────────────────────────────────────
Need stable sort?                → Merge Sort
Small array (n < 20)?            → Insertion Sort
Nearly sorted array?             → Insertion Sort (O(n) best)
Sorting integers in small range? → Counting Sort
O(1) extra space required?       → Heap Sort or Quick Sort
Linked list?                     → Merge Sort (no random access needed)
General purpose?                 → Quick Sort (fastest avg) or Merge Sort
External sort (huge file)?       → Merge Sort (sequential access)
Interview question?              → Know Merge Sort and Quick Sort!
```

---

## 💡 Real-World Usage

| Application | Algorithm | Usage |
| :--- | :--- | :--- |
| **Databases** | External Merge Sort | Sorting datasets that are too large to fit into RAM by merging sorted chunks from disk. |
| **System Sort Packages** | TimSort / Introsort | V8 (JS Engine) and Python natively use Timsort (Merge + Insertion). C++ uses Introsort (Quick + Heap + Insertion). |
| **Leaderboards / Analytics** | Priority Queue | Dynamically sorting streaming data to maintain the top K elements efficiently without heavy arrays. |

---

## 🎯 Interview Questions

### 🔥 Q1: Sort Colors (Dutch National Flag)

```javascript
// LeetCode #75 — Sort [0,1,2] without sort() — O(n), O(1)
function sortColors(nums) {
  let low = 0,
    mid = 0,
    high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
}
// [2,0,2,1,1,0] → [0,0,1,1,2,2]
```

### 🔥 Q2: Merge Intervals

```javascript
// LeetCode #56 — O(n log n)
function mergeIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]); // sort by start time
  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    const lastEnd = result[result.length - 1][1];

    if (start <= lastEnd) {
      result[result.length - 1][1] = Math.max(lastEnd, end); // merge
    } else {
      result.push([start, end]); // no overlap, add new
    }
  }
  return result;
}
// [[1,3],[2,6],[8,10],[15,18]] → [[1,6],[8,10],[15,18]]
```

### 🔥 Q3: Kth Largest Element

```javascript
// LeetCode #215 — QuickSelect — O(n) average
function findKthLargest(nums, k) {
  // Partition around pivot, recurse only on relevant side
  function quickSelect(lo, hi) {
    const pivot = partition(nums, lo, hi);
    const kthIdx = nums.length - k; // kth largest = (n-k)th smallest

    if (pivot === kthIdx) return nums[pivot];
    if (pivot < kthIdx) return quickSelect(pivot + 1, hi);
    return quickSelect(lo, pivot - 1);
  }
  return quickSelect(0, nums.length - 1);
}
// [3,2,1,5,6,4], k=2 → 5 (2nd largest)
```

---

## ⚡ Practice Problems

| #   | Problem             | Difficulty | Algorithm          |
| --- | ------------------- | ---------- | ------------------ |
| 1   | Sort Colors         | Medium     | Dutch Flag         |
| 2   | Merge Intervals     | Medium     | Sort + Greedy      |
| 3   | Kth Largest Element | Medium     | QuickSelect / Heap |
| 4   | Meeting Rooms II    | Medium     | Sort + Heap        |
| 5   | Largest Number      | Medium     | Custom comparator  |
| 6   | Count Inversions    | Hard       | Merge Sort         |
| 7   | Sort Linked List    | Medium     | Merge Sort         |

---

## ⚠️ Common Mistakes

```javascript
// ❌ Default .sort() sorts as strings!
[10, 9, 2, 100].sort(); // [10, 100, 2, 9] — WRONG!

// ✅ Always use numeric comparator
[10, 9, 2, 100].sort((a, b) => a - b); // [2, 9, 10, 100] ✅

// ❌ Forgetting that .sort() is in-place AND returns the same array
const sorted = arr.sort(); // arr is also modified!
// ✅ Copy first if you need original
const sorted2 = [...arr].sort((a, b) => a - b);

// ❌ Unstable sort when stability matters (pre-ES2019)
// Modern JS (V8) uses TimSort — stable since ES2019
```

---

**← Previous:** [09 — Graphs](../Data%20Structures/09-Graphs.md) | **Next →** [11 — Searching](./11-Searching.md)
