# 11 — Searching Algorithms

> **Finding elements in data structures efficiently — a fundamental building block for complex algorithms.**

---

## 📖 Definition

Searching algorithms are designed to retrieve information stored within some data structure. They are primarily evaluated based on their time complexity.

- **Sequential Search**: Checks each element one by one (Linear Search).
- **Interval Search**: Targets sorted data structures and repeatedly divides the search interval in half (Binary Search).

---

## 🖼️ Algorithm Visualization

```
Binary Search for Target: 7
Array: [1, 3, 5, 7, 9, 11, 15]

Step 1: Left=0, Right=6, Mid=3 (Value: 7)
[1, 3, 5, [7], 9, 11, 15]
           ^ Target Found!

Binary Search for Target: 4
Array: [1, 3, 5, 7, 9, 11, 15]

Step 1: L=0, R=6, Mid=3 (Value 7) -> 7 > 4, move Right to Mid-1
[1, 3, 5]

Step 2: L=0, R=2, Mid=1 (Value 3) -> 3 < 4, move Left to Mid+1
[5]

Step 3: L=2, R=2, Mid=2 (Value 5) -> 5 > 4, move Right to Mid-1
L=2, R=1 -> L > R (Not Found!)
```

---

## 📊 Complexity Reference

| Algorithm | Best | Average | Worst | Space | Prerequisite |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Linear Search** | `O(1)` | `O(n)` | `O(n)` | `O(1)` | None |
| **Binary Search** | `O(1)` | `O(log n)` | `O(log n)` | `O(1)` | Array must be sorted |

---

## 💻 Implementations

### Linear Search — O(n)

```javascript
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
```

### Binary Search — O(log n)

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // Avoids potential overflow although rare in JS
    const mid = left + Math.floor((right - left) / 2); 

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1; // target is on the right
    else right = mid - 1; // target is on the left
  }

  return -1;
}
```

---

## 💡 Real-World Usage

| Application | Algorithm | Usage |
| :--- | :--- | :--- |
| **Database Indexing** | B-Trees / Binary Search | Quickly locating rows using primary keys without scanning the entire table. |
| **Debugging (Git Bisect)** | Binary Search | `git bisect` uses binary search through commit history to find the exact commit that introduced a bug. |
| **Video Game Collision** | Quad-Trees / Spatial Search | Searching for which objects are close space for rendering or collision mechanics. |
| **Log Analytics** | Binary Search on timestamps | Finding logs that occurred during a specific time range in massive sorted log files. |

---

## 🎯 Interview Questions

### 🔥 Q1: Search in Rotated Sorted Array

```javascript
// LeetCode #33 — O(log n)
function searchRotated(nums, target) {
  let left = 0, right = nums.length - 1;
  while(left <= right) {
    let mid = Math.floor((left + right) / 2);
    if(nums[mid] === target) return mid;
    
    // Left sorted portion
    if(nums[left] <= nums[mid]) {
      if(target >= nums[left] && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } 
    // Right sorted portion
    else {
      if(target > nums[mid] && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}
```

### 🔥 Q2: Find First and Last Position of Element in Sorted Array

```javascript
// LeetCode #34 — O(log n)
function searchRange(nums, target) {
  function findBound(isFirst) {
    let left = 0, right = nums.length - 1, bound = -1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        bound = mid;
        if (isFirst) right = mid - 1; // Keep searching left
        else left = mid + 1; // Keep searching right
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return bound;
  }
  return [findBound(true), findBound(false)];
}
```

---

## ⚡ Practice Problems

| # | Problem | Difficulty | Algorithm |
| :--- | :--- | :--- | :--- |
| 1 | Binary Search | Easy | Binary Search |
| 2 | First Bad Version | Easy | Binary Search |
| 3 | Search Insert Position | Easy | Binary Search |
| 4 | Search in Rotated Sorted Array | Medium | Modified Binary Search |
| 5 | Find Minimum in Rotated Sorted Array | Medium | Modified Binary Search |
| 6 | Search a 2D Matrix | Medium | Binary Search on Matrix |

---

## ⚠️ Common Mistakes

- **Mid calculation overflow**: `let mid = Math.floor((left + right) / 2)` can cause integer overflow in languages with fixed integer sizes. Better: `left + Math.floor((right - left) / 2)`.
- **Infinite Loop**: Off-by-one errors in `while(left < right)` vs `while(left <= right)` and updating pointers `left = mid` instead of `left = mid + 1`. Always carefully trace the condition.

---

**← Previous:** [10 — Sorting](./10-Sorting.md) | **Next →** [12 — Recursion](./12-Recursion.md)
