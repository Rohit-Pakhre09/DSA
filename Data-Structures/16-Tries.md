# 16 — Tries

> **The ultimate data structure for autocomplete, spell checkers, and fast prefix-based string searching.**

---

## 📖 Definition

A **Trie** (pronounced "try", also known as a prefix tree) is a tree-like data structure used to efficiently store and retrieve keys in a dataset of strings. 

- **Nodes represent characters**: Every node of the Trie consists of multiple branches representing all string segments.
- **Fast lookups**: `O(L)` time complexity, where `L` is the length of the string! It bypasses `O(N)` scans of hash table keys.

---

## 🖼️ Trie Structure

```
Inserting: "cat", "car", "dog"

          (root)
         /      \
       'c'      'd'
       /          \
     'a'          'o'
     / \            \
   't' 'r'          'g'
   *    *            *

* denotes a boolean "isWord" flag on the node, meaning a complete word ends there.
Note: "ca" exists as a prefix but is not a valid word in the dictionary.
```

---

## 📊 Complexity Reference

| Operation | Time | Space | Notes |
| :--- | :--- | :--- | :--- |
| **Insert** | `O(L)` | `O(L)` | `L` is length of word. Creates new nodes if needed. |
| **Search (Exact)** | `O(L)` | `O(1)` | Scans down the tree. Checks `isWord` flag. |
| **Search (Prefix)** | `O(L)` | `O(1)` | Scans down the tree. Ignores `isWord` flag. |

Space Complexity of entire Trie: `O(N * M)` where `N` is number of words and `M` is max word length. Tries use MORE memory than arrays/hash maps.

---

## 💻 Implementations

### Standard Trie (JavaScript)

```javascript
class TrieNode {
  constructor() {
    this.children = {}; // Hash map of character -> TrieNode
    this.isWord = false; // Marks the end of a valid dictionary word
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let curr = this.root;
    for (let char of word) {
      if (!curr.children[char]) {
        curr.children[char] = new TrieNode();
      }
      curr = curr.children[char];
    }
    curr.isWord = true;
  }

  search(word) {
    let curr = this.root;
    for (let char of word) {
      if (!curr.children[char]) return false;
      curr = curr.children[char];
    }
    return curr.isWord === true;
  }

  startsWith(prefix) {
    let curr = this.root;
    for (let char of prefix) {
      if (!curr.children[char]) return false;
      curr = curr.children[char];
    }
    return true; // We successfully traversed the prefix
  }
}
```

---

## 💡 Real-World Usage

| Application | Algorithm | Usage |
| :--- | :--- | :--- |
| **Autocomplete Systems** | Standard Trie | Google Search, IDE code completion, and mobile keyboards predicting the next typed word. |
| **Spell Checking** | Trie / Prefix Tree | Quickly checking if a typed word exists in the dictionary character by character. |
| **IP Routing** | Radix Trie (Compressed Trie) | Routers use a Trie to find the longest matching IP prefix to forward network packets optimally. |
| **Word Games** | Trie | Boggle, Scrabble, Wordle solvers mapping prefixes to find valid dictionary words across boards. |

---

## 🎯 Interview Questions

### 🔥 Q1: Design Add and Search Words Data Structure

```javascript
// LeetCode #211 — Contains '.' wildcard that can match any char
class WordDictionary {
  constructor() {
    this.root = new TrieNode();
  }
  
  addWord(word) { /* normal trie insert */ }

  search(word) {
    function dfs(idx, node) {
      if (idx === word.length) return node.isWord;
      
      const char = word[idx];
      if (char === '.') {
        // Wildcard: explore all children
        for (const child in node.children) {
          if (dfs(idx + 1, node.children[child])) return true;
        }
        return false;
      } else {
        // Exact match
        if (!node.children[char]) return false;
        return dfs(idx + 1, node.children[char]);
      }
    }
    return dfs(0, this.root);
  }
}
```

### 🔥 Q2: Word Search II (Trie + Backtracking)

```javascript
// LeetCode #212 — Given a 2D board and a list of words, find all words.
// Ideal approach: Insert all dictionary words into a Trie.
// Do DFS + Backtracking from EVERY cell on the board.
// Prune branches early: If path doesn't exist as a prefix in Trie, STOP.
// Time: O(M * N * 4^L), Space: O(total chars in dictionary)
```

---

## ⚡ Practice Problems

| # | Problem | Difficulty | Focus |
| :--- | :--- | :--- | :--- |
| 1 | Implement Trie (Prefix Tree) | Medium | Core structure |
| 2 | Design Add and Search Words DS | Medium | Trie + DFS Backtracking |
| 3 | Replace Words | Medium | Shortest prefix matching |
| 4 | Word Search II | Hard | Matrix DFS Backtracking + Trie |
| 5 | Maximum XOR of Two Numbers in an Array | Medium | Bitwise Trie! |

---

## ⚠️ Common Mistakes

- **Forgetting `isWord` flag**: A path in a Trie indicates a prefix exists, but not necessarily a complete word. The `isWord` boolean is mandatory!
- **Memory Overhead**: Hash maps (`{}`) in JS have significant memory overhead per node. In stricter environments (like C++), using a generic Array `children = new Array(26).fill(null)` for lowercase English alphabets reduces overhead but limits flexibility.

---

**← Previous:** [15 — Sliding Window & Two Pointers](../Algorithms/15-SlidingWindow-TwoPointers.md) | **Next →** [17 — Union Find](./17-UnionFind.md)
