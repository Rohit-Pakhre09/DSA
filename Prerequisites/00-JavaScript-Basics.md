# 00 — JavaScript Basics for DSA

> **The foundational language specific quirks you must know before diving into Data Structures and Algorithms in JS.**

---

## 📖 Definition

JavaScript presents unique advantages and gotchas for algorithm solving compared to languages like Python, Java, or C++. Because JS is single-threaded and heavily relies on its Event Loop, garbage collection, and dynamic typing, you need to understand how exactly it handles memory and objects in the context of DSA.

---

## 💻 Crucial JavaScript Features for DSA

### 1. Variables and Memory (References vs Primitives)

Primitives (`string`, `number`, `boolean`) are passed by **value**. 
Objects (`Array`, `Map`, `Set`, `Object`) are passed by **reference**.

```javascript
// Primitive - safe!
let a = 5;
let b = a;
b = 10; // 'a' remains 5

// References - Dangerous!
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4); // arr1 is NOW ALSO [1, 2, 3, 4]!

// ALWAYS copy arrays if you need a separate state (useful in Backtracking/DP)
let arr3 = [...arr1]; 
```

### 2. Built-in Hash Maps (`{}` vs `Map`)

While `const hash = {}` is extremely common, ES6 `Map` is strictly better for algorithmic problems where keys could be numbers or where order matters.

```javascript
// Object Literal
const obj = {};
obj[1] = "numeric key converted to string '1'";
obj["1"] = "Overwrites '1'!"; // Size tracking is tedious: Object.keys(obj).length

// Map
const map = new Map();
map.set(1, 100);
map.set("1", 200); // Distinct from integer 1!
// Fast O(1) checks
console.log(map.has(1)); // true
console.log(map.size);   // 2
```

### 3. Number Limits & Math

JavaScript only has one number type: Double-precision 64-bit float IEEE 754.
There are no distinct integers.

```javascript
// Safe integers up to 2^53 - 1
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

// Avoid Bitwise Operators for very large numbers!
// JS bitwise operators (<<, >>, | , &) convert numbers to 32-bit integers first!
// So large integer math using bitwise operators WILL TRUNCATE data.

// Infinity is a real numeric value
let minTracked = Infinity;
let maxTracked = -Infinity;
```

---

## 🎯 Important Array Methods & Complexities

Never guess the time complexity of an array method. 
If you accidentally use an `O(N)` method inside an `O(N)` loop, you've secretly written an `O(N^2)` algorithm.

| Method | Syntax | Time Complexity | Note |
| :--- | :--- | :--- | :--- |
| **Push/Pop** | `arr.push(val)` / `arr.pop()` | `O(1)` | Adding/removing from the end is fast. |
| **Shift/Unshift**| `arr.shift()` / `arr.unshift()` | `O(N)` | Adding/removing from the start requires shifting every other element. **Avoid in loops!** |
| **Splice** | `arr.splice(idx, del, val)`| `O(N)` | Inserting/deleting in the middle. |
| **Slice** | `arr.slice(start, end)` | `O(N)` | Creates a shallow copy. |
| **Sort** | `arr.sort((a,b) => a-b)` | `O(N log N)` | Automatically casts to `String` and sorts alphabetically if no callback is provided! |

---

## ⚠️ Common Mistakes

- **Default Sorting**: `[2, 10, 20].sort()` results in `[10, 2, 20]` because "10" comes before "2" lexically! **Always pass a comparator**: `arr.sort((a,b) => a - b)`.
- **String Immutability**: Unlike C++, strings in JS cannot be mutated in place. `str[0] = 'a'` does absolutely nothing. You must convert to an array (`str.split('')`), mutate, and convert back (`arr.join('')`).
- **No Built-in Heap/Priority Queue**: Unlike Python (`heapq`) or Java (`PriorityQueue`), JS doesn't have a native Heap structure. In interviews, you either have to mock implement one, or ask the interviewer if you can assume one exists.

---

**← Previous:** None | **Next →** [01 — Big O](./01-BigO.md)
