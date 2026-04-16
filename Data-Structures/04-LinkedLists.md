# 04 — Linked Lists

> **A linear data structure where each element (node) points to the next — no contiguous memory needed.**

---

## 📖 Definition

A **Linked List** is a sequence of **nodes**, where each node contains:

1. **Data** — the value stored
2. **Pointer(s)** — reference(s) to the next (and optionally previous) node

Unlike arrays, nodes can be anywhere in memory — they are connected by pointers, not physical adjacency.

---

## 🖼️ Visual Structure

### Singly Linked List

```
HEAD
 │
 ▼
┌──────┬──────┐    ┌──────┬──────┐    ┌──────┬──────┐    ┌──────┬──────┐
│  10  │  ●───┼───▶│  20  │  ●───┼───▶│  30  │  ●───┼───▶│  40  │ null │
└──────┴──────┘    └──────┴──────┘    └──────┴──────┘    └──────┴──────┘
  Node 1               Node 2              Node 3              Node 4
 data  next           data  next          data  next          data  next

HEAD → [10|●] → [20|●] → [30|●] → [40|null]
```

### Doubly Linked List

```
HEAD                                                              TAIL
 │                                                                 │
 ▼                                                                 ▼
┌──────┬──────┬──────┐    ┌──────┬──────┬──────┐    ┌──────┬──────┬──────┐
│ null │  10  │  ●───┼───▶│  ●   │  20  │  ●───┼───▶│  ●   │  30  │ null │
└──────┴──────┴──────┘◀───┼──●   └──────┴──────┘◀───┼──●   └──────┴──────┘
  prev  data   next         prev   data   next         prev   data   next
```

### Circular Linked List

```
HEAD
 │
 ▼
[10] → [20] → [30] → [40]
  ▲                     │
  └─────────────────────┘
  (tail points back to head)
```

---

## 📊 Complexity Comparison

| Operation        | Linked List                 | Array          |
| ---------------- | --------------------------- | -------------- |
| Access by index  | O(n)                        | O(1)           |
| Search           | O(n)                        | O(n)           |
| Insert at head   | **O(1)**                    | O(n)           |
| Insert at tail   | O(1)\*                      | O(1) amortized |
| Insert at middle | O(n) to find + O(1) to link | O(n)           |
| Delete at head   | **O(1)**                    | O(n)           |
| Delete at tail   | O(n) singly / O(1) doubly   | O(1)           |
| Delete at middle | O(n)                        | O(n)           |
| Memory overhead  | Extra pointer per node      | None           |

\*O(1) if tail pointer maintained

---

## 💻 Implementation

### Singly Linked List

```javascript
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Insert at the beginning — O(1)
  prepend(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  // Insert at the end — O(1) with tail pointer
  append(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  // Insert at index — O(n)
  insertAt(val, index) {
    if (index === 0) return this.prepend(val);
    if (index >= this.size) return this.append(val);

    const node = new Node(val);
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next; // traverse to position before index
    }
    node.next = current.next;
    current.next = node;
    this.size++;
  }

  // Remove from head — O(1)
  removeHead() {
    if (!this.head) return null;
    const val = this.head.val;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.size--;
    return val;
  }

  // Remove by value — O(n)
  remove(val) {
    if (!this.head) return false;
    if (this.head.val === val) {
      this.removeHead();
      return true;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.val === val) {
        if (current.next === this.tail) this.tail = current;
        current.next = current.next.next; // bypass the node
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // Convert to array for printing — O(n)
  toArray() {
    const arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    return arr;
  }

  print() {
    console.log(this.toArray().join(" → ") + " → null");
  }
}

// Usage:
const list = new LinkedList();
list.append(10); // 10 → null
list.append(20); // 10 → 20 → null
list.append(30); // 10 → 20 → 30 → null
list.prepend(5); //  5 → 10 → 20 → 30 → null
list.remove(20); //  5 → 10 → 30 → null
list.print();
```

### Doubly Linked List

```javascript
class DLLNode {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(val) {
    const node = new DLLNode(val);
    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  // Remove from tail — O(1)! (impossible with singly)
  removeTail() {
    if (!this.tail) return null;
    const val = this.tail.val;
    this.tail = this.tail.prev;
    if (this.tail) this.tail.next = null;
    else this.head = null;
    this.size--;
    return val;
  }
}
```

---

## 💡 Real-World Usage

| Application               | Linked List Type | Reason                      |
| ------------------------- | ---------------- | --------------------------- |
| **Browser Back/Forward**  | Doubly           | Navigate in both directions |
| **Music Player Playlist** | Circular         | Loop back to start          |
| **Undo/Redo**             | Doubly           | Move through history        |
| **Memory Allocator (OS)** | Singly           | Track free memory blocks    |
| **Hash Table Chaining**   | Singly           | Handle collisions           |
| **LRU Cache**             | Doubly + HashMap | O(1) eviction from tail     |
| **Fibonacci Queue**       | Complex          | Priority queue operations   |

---

## 🔥 Core Algorithms

### 1. Reverse a Linked List (Iterative) — O(n), O(1)

```javascript
function reverseList(head) {
  let prev = null;
  let current = head;

  while (current) {
    const next = current.next; // save next before overwriting
    current.next = prev; // reverse the pointer
    prev = current; // move prev forward
    current = next; // move current forward
  }

  return prev; // prev is now the new head
}

/*
Initial:  null ← prev   current → [1] → [2] → [3] → null
Step 1:          [1] → null     prev=[1]   curr=[2]
Step 2:   [1] ← [2] → null     prev=[2]   curr=[3]
Step 3:   [2] ← [3] → null     prev=[3]   curr=null
Done:     null ← [1] ← [2] ← [3]   return [3] as new head
*/
```

### 2. Reverse a Linked List (Recursive) — O(n), O(n) stack

```javascript
function reverseListRecursive(head) {
  if (!head || !head.next) return head; // base case: 1 node or empty

  const newHead = reverseListRecursive(head.next); // recurse to end
  head.next.next = head; // make next node point back to current
  head.next = null; // remove old forward pointer
  return newHead;
}
```

### 3. Detect Cycle — Floyd's Tortoise & Hare

```javascript
function hasCycle(head) {
  let slow = head; // moves 1 step
  let fast = head; // moves 2 steps

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true; // they meet → cycle exists
  }
  return false;
}
/*
[1] → [2] → [3] → [4] → [5]
                    ↑          ↓
                   [7] ← [6] ←┘

slow: 1→2→3→4→5→6→7→4
fast: 1→3→5→7→4→6→3→5
                         ↑ They meet here → CYCLE DETECTED!
*/

// Find WHERE the cycle starts — O(n)
function detectCycleStart(head) {
  let slow = head,
    fast = head;

  // Phase 1: detect cycle
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }
  if (!fast || !fast.next) return null; // no cycle

  // Phase 2: find start — move one pointer to head, advance both at speed 1
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow; // meeting point = cycle start
}
```

### 4. Find Middle Node — O(n), O(1)

```javascript
function findMiddle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next; // 1 step
    fast = fast.next.next; // 2 steps
  }
  return slow; // when fast reaches end, slow is at middle

  /*
  [1] → [2] → [3] → [4] → [5]
  fast skips 2, slow skips 1:
  Step 1: slow=2, fast=3
  Step 2: slow=3, fast=5
  fast.next = null → stop. slow=3 ✅ (middle)
  */
}
```

### 5. Merge Two Sorted Lists — O(n+m), O(1)

```javascript
function mergeSortedLists(l1, l2) {
  const dummy = new Node(0); // dummy head simplifies edge cases
  let current = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  current.next = l1 || l2; // attach remaining nodes

  return dummy.next; // dummy.next is actual head
}
// [1→3→5] and [2→4→6] → [1→2→3→4→5→6]
```

### 6. Remove Nth Node From End — O(n), O(1)

```javascript
function removeNthFromEnd(head, n) {
  const dummy = new Node(0);
  dummy.next = head;
  let fast = dummy,
    slow = dummy;

  // Move fast n+1 steps ahead
  for (let i = 0; i <= n; i++) fast = fast.next;

  // Move both until fast reaches end
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  // slow.next is the node to remove
  slow.next = slow.next.next;
  return dummy.next;

  /*
  Remove 2nd from end in [1→2→3→4→5]:
  fast starts n+1=3 steps ahead
  fast=[3], slow=[dummy]
  Move: fast=[4], slow=[1]
  Move: fast=[5], slow=[2]
  Move: fast=null, slow=[3]
  slow.next (node 4) is removed → [1→2→3→5]
  */
}
```

---

## 🎯 Interview Questions

### 🔥 Q1: Is a Linked List a palindrome?

```javascript
function isPalindrome(head) {
  // Step 1: Find middle
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse second half
  let prev = null,
    curr = slow;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // Step 3: Compare first and second half
  let left = head,
    right = prev;
  while (right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }
  return true;
}
// [1→2→2→1] → true
// [1→2→3] → false
```

### 🔥 Q2: Intersection of Two Linked Lists

```javascript
function getIntersectionNode(headA, headB) {
  // If they intersect, pointer math brings them to same node
  let a = headA,
    b = headB;
  while (a !== b) {
    a = a ? a.next : headB; // when a exhausted, redirect to headB
    b = b ? b.next : headA; // when b exhausted, redirect to headA
  }
  return a; // null if no intersection, or the intersection node
  /*
  List A: a1→a2→c1→c2→c3
  List B:      b1→b2→b3→c1→c2→c3
  After redirecting: both travel equal total distance → meet at c1
  */
}
```

### Q3: Add Two Numbers (as Linked Lists)

```javascript
// Numbers stored in reverse: 342 → [2→4→3]
function addTwoNumbers(l1, l2) {
  const dummy = new Node(0);
  let current = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
    carry = Math.floor(sum / 10);
    current.next = new Node(sum % 10);
    current = current.next;
    l1 = l1?.next;
    l2 = l2?.next;
  }
  return dummy.next;
}
// [2→4→3] + [5→6→4] = 342 + 465 = 807 → [7→0→8]
```

---

## ⚡ Practice Problems

| #   | Problem                       | Difficulty | Key Concept                |
| --- | ----------------------------- | ---------- | -------------------------- |
| 1   | Reverse Linked List           | Easy       | Iterative / Recursive      |
| 2   | Merge Two Sorted Lists        | Easy       | Two pointers               |
| 3   | Linked List Cycle             | Easy       | Fast & Slow                |
| 4   | Remove Duplicates             | Easy       | One pass                   |
| 5   | Add Two Numbers               | Medium     | Carry propagation          |
| 6   | Reorder List                  | Medium     | Find mid + Reverse + Merge |
| 7   | Remove Nth From End           | Medium     | Two pointers               |
| 8   | Copy List with Random Pointer | Medium     | HashMap                    |
| 9   | Sort Linked List              | Medium     | Merge Sort                 |
| 10  | Reverse Nodes in k-Group      | Hard       | Recursive groups           |

---

## ⚠️ Common Mistakes

```javascript
// ❌ Losing reference to next before redirecting
current.next = prev; // Now we can't get to current.next!
// ✅ Always save next first
const next = current.next;
current.next = prev;
current = next;

// ❌ Off-by-one in two-pointer gap
for (let i = 0; i < n; i++) fast = fast.next; // gap = n
for (let i = 0; i <= n; i++) fast = fast.next; // gap = n+1 (needed for dummy head)

// ❌ Forgetting to handle empty list
function reverse(head) {
  // Without this check, head.next throws on empty list!
  if (!head || !head.next) return head;
  // ...
}

// ❌ Infinite loop in cycle-creating code
node.next = head; // make circular — careful! traversal won't terminate
```

---

**← Previous:** [03 — Strings](./03-Strings.md) | **Next →** [05 — Stacks & Queues](./05-Stacks-Queues.md)
