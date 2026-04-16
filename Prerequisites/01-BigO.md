# 01 — Big-O Notation & Complexity Analysis

> **The language we use to talk about how efficient an algorithm is.**

---

## 📖 What is Big-O?

Big-O notation describes the **upper bound** of an algorithm's growth rate — how its runtime or memory usage scales as the input size `n` grows toward infinity.

It answers: _"As the input gets huge, how much slower (or more memory-hungry) does my algorithm become?"_

Big-O ignores:

- Constants (`2n` → `O(n)`)
- Lower-order terms (`n² + n` → `O(n²)`)
- Hardware differences

---

## 🖼️ Complexity Hierarchy (Best → Worst)

```
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)

Growth Rate Visual (n = 100):
───────────────────────────────────────────────────────
O(1)        →   1 operation
O(log n)    →   7 operations
O(n)        →   100 operations
O(n log n)  →   700 operations
O(n²)       →   10,000 operations
O(2ⁿ)       →   1,267,650,600,228,229,401,496,703,205,376 operations  🔥💀
O(n!)       →   9.3 × 10^157 operations  💀💀💀
───────────────────────────────────────────────────────

     │
n!   │ *
     │  *
2^n  │   *
     │    *
n²   │      **
     │         **
n log│n           ***
     │               ****
n    │                    ********
     │                             *************
log n│                                          ******************
O(1) │__________________________________________________
     └──────────────────────────────────────────────────→  n
```

---

## 💻 Common Complexities with Examples

### O(1) — Constant Time

```javascript
// No matter how big the array, always 1 operation
function getFirst(arr) {
  return arr[0]; // O(1)
}

function isEven(n) {
  return n % 2 === 0; // O(1)
}

// Hash map lookup is O(1) average
const map = new Map();
map.set("key", "value");
map.get("key"); // O(1)
```

### O(log n) — Logarithmic Time

```javascript
// Each step HALVES the problem size
// Binary search: n=1000 → ~10 steps, n=1,000,000 → ~20 steps

function binarySearch(arr, target) {
  let left = 0,
    right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
// Each iteration: search space cuts in half → O(log n)
```

### O(n) — Linear Time

```javascript
// Visit every element once
function findMax(arr) {
  let max = -Infinity;
  for (let num of arr) {
    // n iterations
    if (num > max) max = num;
  }
  return max; // O(n)
}

// Two separate loops = O(n) + O(n) = O(2n) = O(n)
function doTwoThings(arr) {
  for (let x of arr) console.log(x); // O(n)
  for (let x of arr) console.log(x); // O(n)
  // Total: O(2n) = O(n)  ← constants drop
}
```

### O(n log n) — Linearithmic Time

```javascript
// Most efficient general-purpose sorting
// Merge Sort, Quick Sort (avg), Heap Sort

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid)); // log n levels
  const right = mergeSort(arr.slice(mid)); // log n levels
  return merge(left, right); // n work per level
} // Total: O(n log n)
```

### O(n²) — Quadratic Time

```javascript
// Nested loops over the same input
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    // n
    for (let j = 0; j < arr.length - 1; j++) {
      // n
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
} // O(n²)

// Find all pairs
function allPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    // n
    for (let j = 0; j < arr.length; j++) {
      // n
      console.log(arr[i], arr[j]);
    }
  }
} // O(n²)
```

### O(2ⁿ) — Exponential Time

```javascript
// Each call spawns 2 more calls → doubles each step
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2); // O(2^n)
}
// fib(50) → over 1 quadrillion calls! Use DP instead.
```

### O(n!) — Factorial Time

```javascript
// Generating all permutations
function permutations(arr) {
  if (arr.length <= 1) return [arr];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (let perm of permutations(rest)) {
      result.push([arr[i], ...perm]);
    }
  }
  return result;
} // O(n!) — only feasible for n < 12 or so
```

---

## 📖 Space Complexity

Big-O also measures **memory usage**.

```javascript
// O(1) Space — constant extra memory
function sum(arr) {
  let total = 0; // 1 variable
  for (let n of arr) total += n;
  return total;
}

// O(n) Space — grows with input
function doubleAll(arr) {
  const result = []; // new array of size n
  for (let n of arr) result.push(n * 2);
  return result;
}

// O(n) Space — call stack in recursion
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1); // n frames on the call stack
}

// O(log n) Space — binary search recursion stack
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target)
    return binarySearchRecursive(arr, target, mid + 1, right);
  return binarySearchRecursive(arr, target, left, mid - 1);
} // log n stack frames
```

---

## 🖼️ Three Cases

```
Best Case  (Ω - Omega)   → The MINIMUM work done
Average Case (Θ - Theta) → Expected work on average input
Worst Case (O - Big-O)   → MAXIMUM work done

Example: Linear Search in [3, 7, 2, 9, 1]
──────────────────────────────────────────
Searching for 3:  → Found at index 0 → Best Case  Ω(1)
Searching for 2:  → Found at index 2 → Average    Θ(n/2) = Θ(n)
Searching for 5:  → Not found, scan all → Worst  O(n)

In interviews, Big-O (worst case) is what matters most.
```

---

## 🖼️ Drop Non-Dominant Terms

```javascript
// What's the complexity of this?
function example(arr) {
  // Loop 1 — O(n²)
  for (let i = 0; i < arr.length; i++)
    for (let j = 0; j < arr.length; j++) console.log(arr[i], arr[j]);

  // Loop 2 — O(n)
  for (let x of arr) console.log(x);
}

// Total: O(n²) + O(n) = O(n² + n) = O(n²)
// The n² dominates; n is irrelevant for large n.
```

---

## 📊 JavaScript Built-in Complexity Quick Reference

| Operation         | Data Structure | Time           | Notes                    |
| ----------------- | -------------- | -------------- | ------------------------ |
| `arr[i]`          | Array          | O(1)           | Direct index             |
| `arr.push()`      | Array          | O(1) amortized | Occasionally O(n) resize |
| `arr.pop()`       | Array          | O(1)           | Remove last              |
| `arr.shift()`     | Array          | O(n)           | Shifts all elements      |
| `arr.unshift()`   | Array          | O(n)           | Shifts all elements      |
| `arr.splice()`    | Array          | O(n)           | Worst case               |
| `arr.indexOf()`   | Array          | O(n)           | Linear scan              |
| `arr.includes()`  | Array          | O(n)           | Linear scan              |
| `arr.sort()`      | Array          | O(n log n)     | TimSort                  |
| `map.get/set/has` | Map            | O(1) avg       | Hash lookup              |
| `set.add/has`     | Set            | O(1) avg       | Hash lookup              |
| `str.slice()`     | String         | O(n)           | Creates new string       |
| `str.split()`     | String         | O(n)           |                          |

---

## 💡 Real-World Examples

| Scenario                         | Algorithm             | Complexity       | Why                  |
| -------------------------------- | --------------------- | ---------------- | -------------------- |
| Google searching 1 billion pages | Inverted index lookup | O(1) or O(log n) | Pre-built index      |
| Sorting your Gmail inbox         | TimSort               | O(n log n)       | Best comparison sort |
| GPS finding shortest route       | Dijkstra's            | O(E log V)       | Priority queue       |
| Checking username availability   | Hash set lookup       | O(1)             | Hash function        |
| Password brute-force (bad!)      | Try all combos        | O(26ⁿ)           | Exponential = secure |
| Netflix recommending movies      | Matrix factorization  | O(n·k)           | Linear in users      |

---

## 🎯 Interview Questions

### Q1: What is the time complexity of accessing an element in a JavaScript array by index?

**Answer:** O(1) — Arrays are stored contiguously in memory; index access is a direct memory address calculation.

### Q2: Why do we drop constants in Big-O?

**Answer:** Big-O describes growth rate as n → ∞. Whether an algorithm does `2n` or `100n` operations, as n grows to billions, the constant factor becomes irrelevant compared to the growth rate itself. `O(2n) = O(n)` because both grow _linearly_.

### Q3: What's the difference between time and space complexity?

**Answer:** Time complexity measures how many operations are performed. Space complexity measures how much extra memory is used. Both are expressed in Big-O. An algorithm can trade one for the other (memoization: use more space to save time).

### Q4: What is amortized O(1) for array push?

**Answer:** Occasionally, when an array is full, JavaScript must allocate a new (usually 2×) array and copy all elements — O(n). But this happens so rarely that averaged across many pushes, each push costs O(1). The expensive copy is "amortized" over all the cheap pushes.

### Q5: Is O(log n) always better than O(n)?

**Answer:** For large n, yes. But for small n (say n < 50), constants matter more and O(n) may actually be faster in practice due to cache efficiency and simpler code. This is why libraries like V8 use insertion sort (O(n²)) for small arrays.

---

## ⚡ Practice Problems

1. **Easy:** What is the Big-O of `[1,2,3].indexOf(3)`? What about `new Set([1,2,3]).has(3)`?

2. **Medium:** Analyze this function:

```javascript
function mystery(n) {
  let count = 0;
  for (let i = n; i > 0; i = Math.floor(i / 2)) {
    for (let j = 0; j < n; j++) {
      count++;
    }
  }
  return count;
}
// Answer: O(n log n) — outer loop runs log n times, inner runs n times
```

3. **Hard:** You have an array of n numbers. You need to find all triplets that sum to zero. What's the best complexity you can achieve?
   - Brute force: O(n³) — three nested loops
   - Better: O(n²) — sort + two pointers (covered in 15-SlidingWindow-TwoPointers.md)

---

## ⚠️ Common Mistakes

```javascript
// ❌ MISTAKE: Thinking two nested loops is always O(n²)
function example(arr1, arr2) {
  for (let a of arr1) {
    // arr1.length = n
    for (let b of arr2) {
      // arr2.length = m
      console.log(a, b);
    }
  }
}
// ✅ CORRECT: This is O(n × m), not O(n²)!
// Only O(n²) if both loops use the same input.

// ❌ MISTAKE: Ignoring built-in method costs
function containsDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i], i + 1) !== -1) return true; // indexOf = O(n)!
  }
  return false;
}
// This is O(n²), not O(n)! Use a Set instead.

// ✅ CORRECT:
function containsDuplicateFast(arr) {
  const seen = new Set();
  for (let n of arr) {
    if (seen.has(n)) return true; // O(1)
    seen.add(n);
  }
  return false;
} // O(n) time, O(n) space
```

---

## 🔥 Key Takeaways

- Always analyze **worst-case** unless told otherwise
- Drop **constants** and **non-dominant terms**
- `O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)`
- **Space complexity** matters just as much as time
- Know your JavaScript built-in costs (shift/unshift are O(n)!)

---

**Next →** [02 — Arrays](../Data%20Structures/02-Arrays.md)
