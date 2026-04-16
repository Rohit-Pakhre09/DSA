# 06 — Hash Tables / Maps

> **The secret weapon of DSA interviews — turns O(n) searches into O(1).**

---

## 📖 Definition

A **Hash Table** (also Hash Map or Dictionary) maps **keys to values** using a **hash function** that converts a key into an array index. This enables average **O(1)** insert, delete, and lookup.

---

## 🖼️ How It Works

```
Key → Hash Function → Bucket Index → Value

"apple" ──→ hash("apple") = 3 ──→ table[3] = 1.50
"banana" ─→ hash("banana") = 7 ──→ table[7] = 0.75
"cherry" ─→ hash("cherry") = 1 ──→ table[1] = 2.00

Hash Table (size 10):
Index: [0]   [1]       [2]  [3]      [4]  [5]  [6]  [7]        [8]  [9]
       null  cherry    null apple    null null null banana     null  null
             $2.00          $1.50                   $0.75
```

### Collision Handling

```
Two keys hash to the SAME bucket → COLLISION

Method 1: Chaining (most common)
Each bucket holds a linked list
       [3] → ("apple", 1.50) → ("mango", 3.00) → null

Method 2: Open Addressing (linear probe)
On collision, try next available slot
       [3] = "apple"    [4] = "mango"  ← placed here instead
```

---

## 📊 Complexity Reference

| Operation | Average | Worst Case | Notes                    |
| --------- | ------- | ---------- | ------------------------ |
| Insert    | O(1)    | O(n)       | Worst = all keys collide |
| Delete    | O(1)    | O(n)       |                          |
| Lookup    | O(1)    | O(n)       |                          |
| Space     | O(n)    | O(n)       |                          |

Worst case is extremely rare with a good hash function. In practice, treat all ops as **O(1)**.

---

## 💻 JavaScript: Map, Set, Object

### Map — Best for Key-Value Storage

```javascript
const map = new Map();

// Insert — O(1)
map.set("apple", 1.5);
map.set("banana", 0.75);
map.set(42, "numeric key"); // any type as key!
map.set({ id: 1 }, "object key"); // even objects!

// Lookup — O(1)
map.get("apple"); // 1.50
map.has("apple"); // true
map.has("cherry"); // false

// Delete — O(1)
map.delete("banana");

// Size
map.size; // 3

// Iteration
for (let [key, val] of map) console.log(key, val);
map.forEach((val, key) => console.log(key, val));
[...map.keys()]; // array of keys
[...map.values()]; // array of values
[...map.entries()]; // array of [key, val] pairs

// Initialize from array of pairs
const prices = new Map([
  ["apple", 1.5],
  ["banana", 0.75],
]);
```

### Set — Unique Values Only

```javascript
const set = new Set();

set.add(1);
set.add(2);
set.add(1); // duplicate ignored
set.size; // 2

set.has(1); // true
set.has(99); // false
set.delete(1);

// Initialize from array — removes duplicates!
const unique = new Set([1, 2, 2, 3, 3, 3]); // Set {1,2,3}
const uniqueArr = [...new Set([1, 2, 2, 3])]; // [1,2,3]

// Set operations
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

// Union
const union = new Set([...a, ...b]); // {1,2,3,4,5,6}

// Intersection
const inter = new Set([...a].filter((x) => b.has(x))); // {3,4}

// Difference (a - b)
const diff = new Set([...a].filter((x) => !b.has(x))); // {1,2}
```

### Object as Hash Map (limitations)

```javascript
const obj = {};
obj["name"] = "Alice";
obj.age = 30;

// ⚠️ Only string/Symbol keys!
obj[1] = "one"; // key stored as "1" (string)
obj[{}] = "oops"; // key stored as "[object Object]"!

// ⚠️ Inherited keys from prototype!
"toString" in obj; // true — but we didn't add it!

// ✅ Safe object as map — use null prototype
const safeMap = Object.create(null);
"toString" in safeMap; // false ✅

// Prefer Map over Object for:
// - Non-string keys
// - Frequent additions/deletions
// - Need .size property
// - Need guaranteed insertion order
```

---

## 💡 Real-World Usage

| Application           | Usage                   | Example                    |
| --------------------- | ----------------------- | -------------------------- |
| **Database Indexing** | Hash Index              | Find user by email in O(1) |
| **Caching**           | Key-Value store         | Redis, Memcached           |
| **Password Hashing**  | bcrypt, SHA             | Store hashed passwords     |
| **Routing Tables**    | IP → Interface          | Network switches           |
| **Symbol Tables**     | Variable names → memory | Compilers                  |
| **Deduplication**     | Set membership          | Remove duplicate URLs      |
| **Frequency Count**   | Char → count            | Most common word           |

---

## 🔥 Core Patterns

### Pattern 1: Frequency Counter

```javascript
// Count occurrences of each element
function mostFrequent(arr) {
  const freq = new Map();
  for (let x of arr) freq.set(x, (freq.get(x) || 0) + 1);

  let maxCount = 0,
    result = null;
  for (let [val, count] of freq) {
    if (count > maxCount) {
      maxCount = count;
      result = val;
    }
  }
  return result;
}
// [1,2,3,2,2,3,1,2] → 2 (appears 4 times)
```

### Pattern 2: Complement / Two Sum Pattern

```javascript
// Store what we've seen; check if complement exists — O(n)
function twoSum(nums, target) {
  const seen = new Map(); // value → index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}
// [2,7,11,15], target=9 → [0,1]  (2+7=9)

/*
i=0: need 7, not seen. store {2:0}
i=1: need 2, seen at index 0! → return [0,1] ✅
*/
```

### Pattern 3: Grouping / Categorizing

```javascript
// Group elements by a computed key
function groupByLength(words) {
  const groups = new Map();
  for (let word of words) {
    const key = word.length;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return groups;
}
// ["cat","dog","elephant","ant"] → {3:["cat","dog","ant"], 8:["elephant"]}
```

---

## 🎯 Interview Questions

### 🔥 Q1: Two Sum (Classic)

```javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) return [map.get(diff), i];
    map.set(nums[i], i);
  }
}
```

### 🔥 Q2: Longest Consecutive Sequence

```javascript
// O(n) — LeetCode #128
function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let longest = 0;

  for (let num of numSet) {
    // Only start counting from the beginning of a sequence
    if (!numSet.has(num - 1)) {
      let length = 1;
      while (numSet.has(num + length)) length++;
      longest = Math.max(longest, length);
    }
  }
  return longest;
}
// [100,4,200,1,3,2] → 4 (sequence: 1,2,3,4)
```

### 🔥 Q3: Subarray Sum Equals K

```javascript
// LeetCode #560 — prefix sum + hash map — O(n)
function subarraySum(nums, k) {
  const prefixCount = new Map([[0, 1]]); // sum → count
  let sum = 0,
    count = 0;

  for (let num of nums) {
    sum += num;
    // If (sum - k) exists as a prefix, those subarrays sum to k
    count += prefixCount.get(sum - k) || 0;
    prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
  }
  return count;
}
// [1,1,1], k=2 → 2 ([1,1] at positions 0-1 and 1-2)
```

### Q4: LRU Cache

```javascript
// LeetCode #146 — Map + Doubly Linked List — O(1) ops
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map(); // key → node
    // Sentinel nodes simplify insertion/deletion
    this.head = { key: null, val: null, prev: null, next: null }; // MRU end
    this.tail = { key: null, val: null, prev: null, next: null }; // LRU end
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._remove(node);
    this._insert(node); // move to front (MRU)
    return node.val;
  }

  put(key, val) {
    if (this.map.has(key)) this._remove(this.map.get(key));
    const node = { key, val, prev: null, next: null };
    this.map.set(key, node);
    this._insert(node);
    if (this.map.size > this.capacity) {
      const lru = this.tail.prev; // LRU is just before tail
      this._remove(lru);
      this.map.delete(lru.key);
    }
  }

  _insert(node) {
    // Insert at front (after head) = MRU
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  _remove(node) {
    // Remove from its current position
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
}
```

---

## ⚡ Practice Problems

| #   | Problem                  | Difficulty | Pattern              |
| --- | ------------------------ | ---------- | -------------------- |
| 1   | Two Sum                  | Easy       | Complement           |
| 2   | Valid Anagram            | Easy       | Frequency            |
| 3   | Contains Duplicate       | Easy       | Set                  |
| 4   | Group Anagrams           | Medium     | Grouping             |
| 5   | Top K Frequent Elements  | Medium     | Freq + Bucket sort   |
| 6   | Subarray Sum = K         | Medium     | Prefix + Map         |
| 7   | Longest Consecutive Seq  | Medium     | Set                  |
| 8   | 4Sum II                  | Medium     | Split & combine      |
| 9   | LRU Cache                | Medium     | Map + DLL            |
| 10  | Minimum Window Substring | Hard       | Sliding Window + Map |

---

## ⚠️ Common Mistakes

```javascript
// ❌ Using Object instead of Map for non-string keys
const map = {};
map[[1, 2]] = "value"; // key becomes "1,2" (string)!
// ✅ Use Map
const m = new Map();
m.set([1, 2], "value"); // But note: [1,2] !== [1,2] (different references)

// ❌ Forgetting || 0 default for counters
freq[char] += 1; // NaN if char not in freq!
// ✅
freq[char] = (freq[char] || 0) + 1;
// Or with Map:
map.set(char, (map.get(char) || 0) + 1);

// ❌ Iterating and modifying at same time
for (let [k, v] of map) {
  if (v === 0) map.delete(k); // undefined behavior!
}
// ✅ Collect keys first, then delete
const toDelete = [...map.entries()].filter(([k, v]) => v === 0).map(([k]) => k);
toDelete.forEach((k) => map.delete(k));
```

---

**← Previous:** [05 — Stacks & Queues](./05-Stacks-Queues.md) | **Next →** [07 — Trees](./07-Trees.md)
