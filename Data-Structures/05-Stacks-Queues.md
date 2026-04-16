# 05 — Stacks & Queues

> **Two of the most essential abstract data types — the building blocks of algorithms from parsing to BFS.**

---

## 📖 Stack — Definition

A **Stack** is a **LIFO** (Last In, First Out) data structure.
Think of a stack of plates — you add and remove from the **top** only.

```
PUSH (add)         POP (remove)
   │                   │
   ▼                   ▼
┌─────┐           ┌─────┐
│  4  │ ◄── TOP   │  4  │ ◄── removed first
├─────┤           ├─────┤
│  3  │           │  3  │
├─────┤           ├─────┤
│  2  │           │  2  │
├─────┤           ├─────┤
│  1  │ ◄── BOTTOM│  1  │
└─────┘           └─────┘

Order pushed: 1,2,3,4    Order popped: 4,3,2,1
```

---

## 📖 Queue — Definition

A **Queue** is a **FIFO** (First In, First Out) data structure.
Think of a line at a ticket counter — first person in is first served.

```
ENQUEUE (add to rear)        DEQUEUE (remove from front)

FRONT                                             REAR
  │                                                 │
  ▼                                                 ▼
┌─────┬─────┬─────┬─────┐
│  1  │  2  │  3  │  4  │       Enqueue: add at right →
└─────┴─────┴─────┴─────┘       Dequeue: remove from left ←

Order enqueued: 1,2,3,4    Order dequeued: 1,2,3,4  (same order)
```

---

## 📊 Complexity Reference

| Operation        | Stack (Array) | Queue (Array) | Queue (LinkedList) |
| ---------------- | ------------- | ------------- | ------------------ |
| Push/Enqueue     | O(1)          | O(1)\*        | O(1)               |
| Pop/Dequeue      | O(1)          | O(n) shift!   | O(1)               |
| Peek (top/front) | O(1)          | O(1)          | O(1)               |
| Search           | O(n)          | O(n)          | O(n)               |
| isEmpty          | O(1)          | O(1)          | O(1)               |

\*Using array as queue: `shift()` is O(n) — use a proper Queue class!

---

## 💻 Stack Implementation

### Using JavaScript Array (Recommended)

```javascript
// JS arrays make perfect stacks — push/pop are both O(1)
const stack = [];

stack.push(1); // [1]
stack.push(2); // [1, 2]
stack.push(3); // [1, 2, 3]
stack.pop(); // returns 3, stack = [1, 2]
stack[stack.length - 1]; // peek → 2 (no removal)
stack.length === 0; // isEmpty check
```

### Stack Class

```javascript
class Stack {
  constructor() {
    this.items = [];
  }

  push(val) {
    this.items.push(val); // O(1)
  }

  pop() {
    if (this.isEmpty()) throw new Error("Stack is empty");
    return this.items.pop(); // O(1)
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1]; // O(1)
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log([...this.items].reverse().join("\n")); // top to bottom
  }
}
```

---

## 💻 Queue Implementation

### ❌ Don't use array.shift() — it's O(n)

```javascript
// BAD — shift() moves every element
const queue = [];
queue.push(1);
queue.push(2);
queue.shift(); // O(n) — very slow for large queues!
```

### ✅ Linked-List Based Queue — O(1) all ops

```javascript
class QueueNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null; // front (dequeue from here)
    this.tail = null; // rear  (enqueue here)
    this.size = 0;
  }

  enqueue(val) {
    const node = new QueueNode(val);
    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  dequeue() {
    if (!this.head) throw new Error("Queue is empty");
    const val = this.head.val;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.size--;
    return val;
  }

  peek() {
    return this.head?.val ?? null;
  }

  isEmpty() {
    return this.size === 0;
  }
}
```

### ✅ Two-Pointer Array Queue (for competitive programming)

```javascript
class ArrayQueue {
  constructor() {
    this.items = [];
    this.front = 0; // pointer instead of shifting
  }

  enqueue(val) {
    this.items.push(val);
  }

  dequeue() {
    if (this.isEmpty()) return null;
    return this.items[this.front++]; // just advance pointer!
  }

  peek() {
    return this.items[this.front];
  }

  isEmpty() {
    return this.front >= this.items.length;
  }

  size() {
    return this.items.length - this.front;
  }
}
```

---

## 📖 Special Variants

### Monotonic Stack

```javascript
// Maintains elements in strictly increasing or decreasing order
// Used for: "Next Greater Element" type problems

// Next Greater Element — O(n) with monotonic stack
function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // indices — monotonically decreasing values

  for (let i = 0; i < nums.length; i++) {
    // Pop all elements smaller than current — current is their NGE
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      const idx = stack.pop();
      result[idx] = nums[i];
    }
    stack.push(i);
  }
  return result;
}
// [2, 1, 2, 4, 3] → [4, 2, 4, -1, -1]
/*
Trace:
i=0: stack=[0(val=2)]
i=1: 1 < 2 → push. stack=[0,1]
i=2: 2 ≥ 1 → pop 1, result[1]=2. 2 = 2 → push. stack=[0,2]
i=3: 4 > 2 → pop 2, result[2]=4. 4 > 2 → pop 0, result[0]=4. stack=[3]
i=4: 3 < 4 → push. stack=[3,4]
End: remaining in stack → result stays -1
*/
```

### Deque (Double-Ended Queue)

```javascript
// Can insert/delete from both ends — O(1) each
// In JS, simulate with doubly linked list or use an array with careful indexing

class Deque {
  constructor() {
    this.items = [];
  }

  addFront(val) {
    this.items.unshift(val);
  } // O(n) in JS!
  addRear(val) {
    this.items.push(val);
  } // O(1)
  removeFront() {
    return this.items.shift();
  } // O(n) in JS!
  removeRear() {
    return this.items.pop();
  } // O(1)
  peekFront() {
    return this.items[0];
  }
  peekRear() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}

// Note: For O(1) front ops, implement with doubly linked list
```

### Priority Queue (Min/Max Heap)

```javascript
// Covered fully in 08-Heaps.md
// Elements dequeued by priority, not insertion order
// Implemented using a Binary Heap
```

---

## 💡 Real-World Usage

| Application               | Type             | Reason                                               |
| ------------------------- | ---------------- | ---------------------------------------------------- |
| **Browser History**       | Stack            | Back button pops last page                           |
| **Undo/Redo**             | Stack (2 stacks) | Undo = pop from undo stack                           |
| **Call Stack**            | Stack            | Function calls (that's why it's called a call STACK) |
| **Expression Evaluation** | Stack            | `3 + 4 * 2` parsing                                  |
| **BFS Graph Traversal**   | Queue            | Process nodes level by level                         |
| **Print Queue**           | Queue            | First document sent prints first                     |
| **OS Task Scheduling**    | Queue            | Fair scheduling                                      |
| **Sliding Window Max**    | Deque            | O(n) window maximum                                  |

---

## 🔥 Core Algorithms

### Evaluate Postfix Expression

```javascript
// "2 3 4 * +" means 2 + (3 * 4) = 14
function evalPostfix(tokens) {
  const stack = [];
  const ops = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => Math.trunc(a / b),
  };

  for (let token of tokens) {
    if (ops[token]) {
      const b = stack.pop(); // second operand
      const a = stack.pop(); // first operand
      stack.push(ops[token](a, b));
    } else {
      stack.push(Number(token));
    }
  }
  return stack[0];
}
// ["2","1","+","3","*"] → (2+1)*3 = 9
```

### BFS with Queue

```javascript
// Level-order traversal — O(n)
function bfs(root) {
  if (!root) return [];
  const queue = [root];
  const result = [];

  while (queue.length) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift(); // dequeue front
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
/*
Tree:         1
            /   \
           2     3
          / \   / \
         4   5 6   7

Output: [[1],[2,3],[4,5,6,7]]
*/
```

---

## 🎯 Interview Questions

### 🔥 Q1: Min Stack

```javascript
// LeetCode #155 — Design a stack that retrieves minimum in O(1)
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = []; // parallel stack tracking minimums
  }

  push(val) {
    this.stack.push(val);
    const currentMin = this.minStack.length
      ? Math.min(val, this.minStack[this.minStack.length - 1])
      : val;
    this.minStack.push(currentMin);
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}
// push(3), push(1), push(2) → getMin()=1, pop(), getMin()=1, pop(), getMin()=3
```

### 🔥 Q2: Daily Temperatures

```javascript
// LeetCode #739 — For each day, how many days until warmer temp?
function dailyTemperatures(temps) {
  const result = new Array(temps.length).fill(0);
  const stack = []; // monotonically decreasing stack of indices

  for (let i = 0; i < temps.length; i++) {
    while (stack.length && temps[stack[stack.length - 1]] < temps[i]) {
      const idx = stack.pop();
      result[idx] = i - idx; // days waited = current - past index
    }
    stack.push(i);
  }
  return result;
}
// [73,74,75,71,69,72,76,73] → [1,1,4,2,1,1,0,0]
```

### 🔥 Q3: Implement Queue using Two Stacks

```javascript
class MyQueue {
  constructor() {
    this.inbox = []; // for push
    this.outbox = []; // for pop/peek
  }

  push(val) {
    this.inbox.push(val);
  }

  pop() {
    this._transfer();
    return this.outbox.pop();
  }

  peek() {
    this._transfer();
    return this.outbox[this.outbox.length - 1];
  }

  _transfer() {
    // Move inbox to outbox (only when outbox is empty)
    if (!this.outbox.length) {
      while (this.inbox.length) {
        this.outbox.push(this.inbox.pop()); // reverse order!
      }
    }
  }

  empty() {
    return !this.inbox.length && !this.outbox.length;
  }
}
// push(1),push(2) → inbox=[1,2]
// pop() → transfer → outbox=[2,1] → pop() = 1 ✅ (FIFO!)
```

### Q4: Largest Rectangle in Histogram

```javascript
// LeetCode #84 — Hard — monotonic stack
function largestRectangleArea(heights) {
  const stack = []; // indices, monotonically increasing heights
  let maxArea = 0;
  heights = [...heights, 0]; // sentinel to flush remaining bars

  for (let i = 0; i < heights.length; i++) {
    while (stack.length && heights[stack[stack.length - 1]] > heights[i]) {
      const height = heights[stack.pop()];
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}
// [2,1,5,6,2,3] → 10 (bars of height 5 and 6, width 2)
```

---

## ⚡ Practice Problems

| #   | Problem                          | Difficulty | Uses                  |
| --- | -------------------------------- | ---------- | --------------------- |
| 1   | Valid Parentheses                | Easy       | Stack                 |
| 2   | Implement Queue with 2 Stacks    | Easy       | 2 Stacks              |
| 3   | Min Stack                        | Medium     | Stack + min tracking  |
| 4   | Daily Temperatures               | Medium     | Monotonic Stack       |
| 5   | Next Greater Element I           | Medium     | Monotonic Stack       |
| 6   | Evaluate Reverse Polish Notation | Medium     | Stack                 |
| 7   | Binary Tree Level Order          | Medium     | Queue (BFS)           |
| 8   | Sliding Window Maximum           | Hard       | Deque                 |
| 9   | Largest Rectangle Histogram      | Hard       | Monotonic Stack       |
| 10  | Trapping Rain Water              | Hard       | Stack or Two Pointers |

---

## ⚠️ Common Mistakes

```javascript
// ❌ Using shift() for queue dequeue — O(n)!
const queue = [1, 2, 3];
queue.shift(); // O(n) — moves all remaining elements!

// ❌ Not checking isEmpty before pop/peek
const stack = [];
stack.pop(); // returns undefined (no error) — dangerous!
// ✅ Always check first
if (stack.length > 0) stack.pop();

// ❌ Confusing Stack and Queue order
// Stack: LIFO — push [1,2,3], pop → 3,2,1
// Queue: FIFO — enqueue [1,2,3], dequeue → 1,2,3
```

---

**← Previous:** [04 — Linked Lists](./04-LinkedLists.md) | **Next →** [06 — Hash Tables](./06-HashTables.md)
