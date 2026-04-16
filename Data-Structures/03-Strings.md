# 03 — Strings

> **An immutable sequence of characters — one of the most common interview topics.**

---

## 📖 Definition

A **String** is an ordered sequence of characters (Unicode in JavaScript). Strings in JS are **immutable** — any "modification" creates a new string.

```
"hello"
  │
  ├─ h (index 0, Unicode: 104)
  ├─ e (index 1, Unicode: 101)
  ├─ l (index 2, Unicode: 108)
  ├─ l (index 3, Unicode: 108)
  └─ o (index 4, Unicode: 111)

Memory: Strings are stored as UTF-16 in JS
Each character: 2 bytes (basic), 4 bytes (emoji/rare chars)
```

---

## 🖼️ String Immutability

```javascript
let str = "hello";
str[0] = "H"; // ❌ Silently fails — strings are immutable!
console.log(str); // "hello" — unchanged

// To "modify", create a new string:
str = "H" + str.slice(1); // "Hello"

// This is why string concatenation in a loop is O(n²)!
// Each += creates a new string and copies everything
let result = "";
for (let i = 0; i < n; i++) {
  result += chars[i]; // O(1) + O(2) + O(3) + ... + O(n) = O(n²)!
}
// ✅ Use array + join instead:
const parts = [];
for (let i = 0; i < n; i++) parts.push(chars[i]); // O(1) each
result = parts.join(""); // O(n) once
```

---

## 📊 Complexity Reference

| Operation         | Time     | Notes                 |
| ----------------- | -------- | --------------------- |
| Access `str[i]`   | O(1)     |                       |
| `.length`         | O(1)     | Cached property       |
| `.slice(i, j)`    | O(j - i) | Creates new string    |
| `.indexOf(sub)`   | O(n·m)   | naive, m = sub.length |
| `.includes(sub)`  | O(n·m)   |                       |
| `+` concatenation | O(n)     | n = result length     |
| `+=` in loop      | O(n²)    | Avoid!                |
| `.split(sep)`     | O(n)     |                       |
| `.join(sep)`      | O(n)     |                       |
| `.replace()`      | O(n)     | first occurrence      |
| `.replaceAll()`   | O(n)     | all occurrences       |

---

## 💻 Essential JS String Methods

```javascript
const str = "Hello, World!";

// Access
str[0]; // 'H'
str.charAt(0); // 'H'
str.charCodeAt(0); // 72 (ASCII/Unicode)
String.fromCharCode(72); // 'H'

// Info
str.length; // 13
str.indexOf("o"); // 4 (first occurrence)
str.lastIndexOf("o"); // 8
str.includes("World"); // true
str.startsWith("Hello"); // true
str.endsWith("!"); // true

// Transform (all return NEW strings)
str.toLowerCase(); // "hello, world!"
str.toUpperCase(); // "HELLO, WORLD!"
str.trim(); // remove leading/trailing spaces
str.trimStart(); // remove leading spaces
str.trimEnd(); // remove trailing spaces

// Extract
str.slice(7, 12); // "World" (start, end exclusive)
str.slice(-6); // "orld!" (negative = from end)
str.substring(7, 12); // "World" (like slice but no negatives)

// Split/Join
"a,b,c".split(","); // ["a","b","c"]
"hello".split(""); // ["h","e","l","l","o"]
["a", "b", "c"].join("-"); // "a-b-c"

// Replace
str.replace("World", "JS"); // "Hello, JS!"
"aabbcc".replaceAll("b", "x"); // "aaxxcc"
str.replace(/[aeiou]/g, "*"); // regex replace all vowels

// Repeat & Pad
"ab".repeat(3); // "ababab"
"5".padStart(3, "0"); // "005"
"5".padEnd(3, "0"); // "500"

// Search with Regex
"hello123".match(/\d+/); // ["123"]
"hello123".match(/\d+/)[0]; // "123"
/^\d+$/.test("123"); // true (all digits?)

// Useful tricks
[..."hello"]; // ["h","e","l","l","o"] (spread string)
Array.from("hello"); // same
"hello".split("").reverse().join(""); // "olleh" (reverse string)
```

---

## 💡 Character Tricks in JavaScript

```javascript
// Character arithmetic — use char codes
const a = "a".charCodeAt(0); // 97
const z = "z".charCodeAt(0); // 122

// Convert char to 0-25 index
function charIndex(c) {
  return c.charCodeAt(0) - "a".charCodeAt(0);
}
charIndex("a"); // 0
charIndex("z"); // 25

// Frequency count with array of 26
function charFrequency(str) {
  const freq = new Array(26).fill(0);
  for (let c of str) freq[charIndex(c)]++;
  return freq;
}

// Check if two strings are anagrams
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const freq = charFrequency(s);
  for (let c of t) {
    freq[charIndex(c)]--;
    if (freq[charIndex(c)] < 0) return false;
  }
  return true;
}
```

---

## 💡 Real-World Usage

| Application         | String Technique       | Example                    |
| ------------------- | ---------------------- | -------------------------- |
| **Search Engines**  | KMP / Rabin-Karp       | Find keywords in documents |
| **DNA Analysis**    | Pattern matching       | Find gene sequences        |
| **Compilers**       | Tokenization           | Split code into tokens     |
| **Autocomplete**    | Trie + prefix matching | Google search suggestions  |
| **Spell Checker**   | Edit distance          | "Did you mean...?"         |
| **URL Routing**     | Regex matching         | Express.js routes          |
| **Data Validation** | Regex                  | Email, phone validation    |

---

## 🔥 Core Patterns

### Pattern 1: Sliding Window for Substrings

```javascript
// Longest substring without repeating characters — O(n)
function lengthOfLongestSubstring(s) {
  const seen = new Map(); // char → last seen index
  let maxLen = 0,
    left = 0;

  for (let right = 0; right < s.length; right++) {
    if (seen.has(s[right]) && seen.get(s[right]) >= left) {
      left = seen.get(s[right]) + 1; // shrink window
    }
    seen.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
// "abcabcbb" → 3 ("abc")
// "dvdf"     → 3 ("vdf")
```

### Pattern 2: Two Pointers for Palindrome

```javascript
// Check if a string is a palindrome
function isPalindrome(s) {
  // Normalize: lowercase, alphanumeric only
  s = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0,
    right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}
// "A man, a plan, a canal: Panama" → true
// "race a car" → false
```

### Pattern 3: HashMap for Frequency

```javascript
// Group Anagrams — O(n·k·log k) where k = avg word length
function groupAnagrams(strs) {
  const map = new Map();
  for (let str of strs) {
    const key = str.split("").sort().join(""); // sorted string as key
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }
  return [...map.values()];
}
// ["eat","tea","tan","ate","nat","bat"]
// → [["eat","tea","ate"],["tan","nat"],["bat"]]
```

---

## 🎯 Interview Questions

### 🔥 Q1: Valid Parentheses

```javascript
function isValid(s) {
  const stack = [];
  const map = { ")": "(", "]": "[", "}": "{" };

  for (let c of s) {
    if ("({[".includes(c)) {
      stack.push(c);
    } else {
      if (stack.pop() !== map[c]) return false;
    }
  }
  return stack.length === 0;
}
// "([])" → true
// "([)]" → false
```

### 🔥 Q2: Minimum Window Substring

```javascript
// LeetCode #76 — O(n)
function minWindow(s, t) {
  const need = new Map();
  for (let c of t) need.set(c, (need.get(c) || 0) + 1);

  let have = 0,
    required = need.size;
  let left = 0,
    minStart = 0,
    minLen = Infinity;
  const window = new Map();

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window.set(c, (window.get(c) || 0) + 1);
    if (need.has(c) && window.get(c) === need.get(c)) have++;

    while (have === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      const lc = s[left];
      window.set(lc, window.get(lc) - 1);
      if (need.has(lc) && window.get(lc) < need.get(lc)) have--;
      left++;
    }
  }
  return minLen === Infinity ? "" : s.slice(minStart, minStart + minLen);
}
// s="ADOBECODEBANC", t="ABC" → "BANC"
```

### 🔥 Q3: Longest Palindromic Substring

```javascript
// Expand around center — O(n²), O(1) space
function longestPalindrome(s) {
  let start = 0,
    maxLen = 1;

  function expand(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      if (right - left + 1 > maxLen) {
        maxLen = right - left + 1;
        start = left;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i); // odd length palindromes (center = i)
    expand(i, i + 1); // even length palindromes (center between i and i+1)
  }
  return s.slice(start, start + maxLen);
}
// "babad" → "bab" or "aba"
// "cbbd"  → "bb"
```

### Q4: String Compression

```javascript
// "aabcccccaaa" → "a2b1c5a3"
function compress(s) {
  let result = "";
  let i = 0;
  while (i < s.length) {
    const char = s[i];
    let count = 0;
    while (i < s.length && s[i] === char) {
      i++;
      count++;
    }
    result += char + count;
  }
  return result.length < s.length ? result : s;
}
```

---

## ⚡ Practice Problems

| #   | Problem                       | Difficulty | Key Technique      |
| --- | ----------------------------- | ---------- | ------------------ |
| 1   | Valid Anagram                 | Easy       | Frequency count    |
| 2   | Valid Palindrome              | Easy       | Two pointers       |
| 3   | Reverse String                | Easy       | Two pointers       |
| 4   | First Unique Character        | Easy       | HashMap            |
| 5   | Longest Common Prefix         | Easy       | Horizontal scan    |
| 6   | Group Anagrams                | Medium     | HashMap + sort key |
| 7   | Longest Substring No Repeat   | Medium     | Sliding window     |
| 8   | String to Integer (atoi)      | Medium     | Parse + edge cases |
| 9   | Longest Palindromic Substring | Medium     | Expand center      |
| 10  | Minimum Window Substring      | Hard       | Sliding window     |

---

## ⚠️ Common Mistakes

```javascript
// ❌ Using == instead of === for character comparison
"A" == 65; // true (type coercion!)
"A" === 65; // false (correct)

// ❌ Forgetting strings are immutable
let s = "hello";
s[0] = "H"; // silently does nothing in JS

// ❌ String concatenation in a loop
let result = "";
for (let c of chars) result += c; // O(n²) — creates new string each time
// ✅ Use array join
const arr = [];
for (let c of chars) arr.push(c);
const result2 = arr.join(""); // O(n)

// ❌ .sort() on characters without understanding Unicode
["z", "a", "B"].sort(); // ['B','a','z'] — uppercase before lowercase!
// ✅ Case-insensitive sort
["z", "a", "B"].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
```

---

**← Previous:** [02 — Arrays](./02-Arrays.md) | **Next →** [04 — Linked Lists](./04-LinkedLists.md)
