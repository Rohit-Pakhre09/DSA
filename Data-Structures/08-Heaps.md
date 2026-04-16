# 08 — Heaps & Priority Queue

> **A complete binary tree with the heap property — the fastest way to repeatedly find min/max.**

---

## 📖 Definition

A **Heap** is a complete binary tree satisfying the **heap property**:

- **Max-Heap**: Every parent ≥ its children (root = maximum)
- **Min-Heap**: Every parent ≤ its children (root = minimum)

A **Priority Queue** is an abstract data type backed by a heap.

---

## 🖼️ Heap Structure

```
Max-Heap:                Min-Heap:
        90                      1
       /   \                  /   \
      70    60               3     2
     / \   / \              / \   / \
    40  50 20  30          7   6  5   4

As Array (0-indexed):
Max: [90, 70, 60, 40, 50, 20, 30]
Min: [ 1,  3,  2,  7,  6,  5,  4]

Index relationships:
Parent of i:      Math.floor((i-1)/2)
Left child of i:  2*i + 1
Right child of i: 2*i + 2

parent(1)=0 ✅  left(0)=1 ✅  right(0)=2 ✅
```

---

## 📊 Complexity Reference

| Operation       | Time     |
| --------------- | -------- |
| Build heap      | O(n)     |
| Peek min/max    | O(1)     |
| Insert          | O(log n) |
| Remove min/max  | O(log n) |
| Heapify up/down | O(log n) |
| Search          | O(n)     |

---

## 💻 Min-Heap Implementation

```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }
  peek() {
    return this.heap[0];
  } // O(1)

  push(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1); // O(log n)
  }

  pop() {
    if (this.size() === 0) return null;
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.size() > 0) {
      this.heap[0] = last;
      this._siftDown(0); // O(log n)
    }
    return min;
  }

  _bubbleUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent] <= this.heap[i]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  _siftDown(i) {
    const n = this.size();
    while (true) {
      let smallest = i;
      const left = 2 * i + 1,
        right = 2 * i + 2;
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === i) break;
      [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
      i = smallest;
    }
  }
}
```

---

## 💡 Real-World Usage

| Application              | Heap Type      | Usage                             |
| ------------------------ | -------------- | --------------------------------- |
| **Dijkstra's Algorithm** | Min-Heap       | Always process closest node first |
| **Task Scheduling**      | Min-Heap       | Run highest priority task         |
| **Median Finder**        | Min + Max heap | Two-heap technique                |
| **Merge K Sorted Lists** | Min-Heap       | Track next smallest across lists  |
| **Event Simulation**     | Min-Heap       | Process events by timestamp       |

---

## 🎯 Interview Questions

### 🔥 Q1: Kth Largest Element

```javascript
// Use min-heap of size k — O(n log k)
function findKthLargest(nums, k) {
  const heap = new MinHeap();
  for (let num of nums) {
    heap.push(num);
    if (heap.size() > k) heap.pop(); // keep only k largest
  }
  return heap.peek(); // root = kth largest
}
// [3,2,1,5,6,4], k=2 → 5
```

### 🔥 Q2: Top K Frequent Elements

```javascript
function topKFrequent(nums, k) {
  const freq = new Map();
  for (let n of nums) freq.set(n, (freq.get(n) || 0) + 1);

  // Bucket sort — O(n)
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (let [num, count] of freq) buckets[count].push(num);

  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }
  return result.slice(0, k);
}
// [1,1,1,2,2,3], k=2 → [1,2]
```

### Q3: Find Median from Data Stream

```javascript
// Two heaps: max-heap for lower half, min-heap for upper half
class MedianFinder {
  constructor() {
    this.lower = new MaxHeap(); // left half
    this.upper = new MinHeap(); // right half
  }
  addNum(num) {
    this.lower.push(num);
    this.upper.push(this.lower.pop());
    if (this.upper.size() > this.lower.size())
      this.lower.push(this.upper.pop());
  }
  findMedian() {
    if (this.lower.size() > this.upper.size()) return this.lower.peek();
    return (this.lower.peek() + this.upper.peek()) / 2;
  }
}
```

---

**← Previous:** [07 — Trees](./07-Trees.md) | **Next →** [09 — Graphs](./09-Graphs.md)
