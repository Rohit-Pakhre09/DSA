# 15 — Sliding Window & Two Pointers

> **Transform O(n²) nested loops into elegant O(n) solutions for array and string problems.**

---

## 📖 Definition

These are two related overarching techniques for solving array/string problems:

- **Two Pointers**: Iterating through the data structure with two variables (pointers). Typically one starts at the beginning and one at the end, moving inwards, or both move in the same direction at varying pace (Fast & Slow).
- **Sliding Window**: A subset of Two Pointers. It focuses on maintaining a "window" of elements by having a `left` and `right` pointer. The window dynamically expands (right pointer moves) and shrinks (left pointer moves) based on some condition.

---

## 🖼️ Algorithm Visualization (Sliding Window)

```
Target Sum: 7
Array: [2, 3, 1, 2, 4, 3]

Step 1: [2] 3 1 2 4 3        Sum: 2 < 7 (Expand Right)
Step 2: [2, 3] 1 2 4 3       Sum: 5 < 7 (Expand Right)
Step 3: [2, 3, 1] 2 4 3      Sum: 6 < 7 (Expand Right)
Step 4: [2, 3, 1, 2] 4 3     Sum: 8 > 7 (Valid! Len 4. Shrink Left)
Step 5: 2 [3, 1, 2] 4 3      Sum: 6 < 7 (Expand Right)
Step 6: 2 [3, 1, 2, 4] 3     Sum: 10 > 7 (Valid! Len 4. Shrink Left)
Step 7: 2 3 [1, 2, 4] 3      Sum: 7 >= 7 (Valid! Len 3. Shrink Left)
... Minimum Length Found: 2 for sub-array [4, 3]
```

---

## 🖼️ When to Use Which?

| Technique | Clues in Problem Description | Example Problems |
| :--- | :--- | :--- |
| **Two Pointers (Opposite Ends)** | "Sorted array", "Find a pair", "Reverse" | Two Sum II, Valid Palindrome, Container With Most Water |
| **Two Pointers (Fast & Slow)** | "Linked List Cycle", "Middle element" | Linked List Cycle, Find the Duplicate Number |
| **Fixed Sliding Window** | "Subarray of size K", "Max sum of K elements" | Max Sum Subarray of Size K |
| **Dynamic Sliding Window** | "Longest substring", "Minimum subarray", "Sum >= S" | Longest Substring Without Repeating Characters |

---

## 💻 Canonical Templates

### Slidng Window (Dynamic Size)

```javascript
function slidingWindowTemplate(nums) {
  let left = 0;
  let result = 0; // or Infinity, -Infinity
  
  for (let right = 0; right < nums.length; right++) {
    // 1. Add nums[right] to the window state
    
    // 2. While the window is INVALID, shrink it from the left
    while (/* condition to shrink window varies */) {
      // Remove nums[left] from window state
      left++;
    }
    
    // 3. Update the result for the current VALID window
    // result = Math.max(result, right - left + 1);
  }
  return result;
}
```

### Two Pointers (Opposite Ends)

```javascript
function twoPointersTemplate(nums) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left < right) { // Use <= if elements can overlap
    if (/* condition met */) {
      return [left, right];
    } else if (/* too small */) {
      left++;
    } else {
      right--;
    }
  }
}
```

---

## 💡 Real-World Usage

| Application | Algorithm | Usage |
| :--- | :--- | :--- |
| **Network Congestion Control** | Sliding Window | TCP uses a sliding window protocol to control the flow of packets between computers. |
| **Rate Limiting** | Sliding Window (Time) | APIs limit requests (e.g. 100 per minute) using a rolling window of timestamps. |
| **Stream Processing** | Sliding Window Algorithms | Analyzing real-time data efficiently by keeping a moving window of recent data (e.g., last 5 seconds of stock prices). |
| **Data Compression** | Sliding Window | LZ77 (used in ZIP, PNG) maps occurring sequences of characters to a sliding window buffer. |

---

## 🎯 Interview Questions

### 🔥 Q1: Longest Substring Without Repeating Characters (Dynamic Window)

```javascript
// LeetCode #3 — O(n) Time, O(min(n, m)) Space
function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0;
  let maxLength = 0;
  
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}
```

### 🔥 Q2: Container With Most Water (Opposite Pointers)

```javascript
// LeetCode #11 — O(n) Time, O(1) Space
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;
  
  while (left < right) {
    const minHeight = Math.min(height[left], height[right]);
    const width = right - left;
    maxArea = Math.max(maxArea, minHeight * width);
    
    // Move the shorter pointer inwards
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return maxArea;
}
```

### 🔥 Q3: Minimum Size Subarray Sum (Dynamic Window)

```javascript
// LeetCode #209 — O(n) Time, O(1) Space
function minSubArrayLen(target, nums) {
  let left = 0;
  let currentSum = 0;
  let minLen = Infinity;
  
  for (let right = 0; right < nums.length; right++) {
    currentSum += nums[right];
    
    while (currentSum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      currentSum -= nums[left];
      left++;
    }
  }
  
  return minLen === Infinity ? 0 : minLen;
}
```

---

## ⚡ Practice Problems

| # | Problem | Difficulty | Technique |
| :--- | :--- | :--- | :--- |
| 1 | Valid Palindrome | Easy | Two Pointers |
| 2 | Move Zeroes | Easy | Two Pointers |
| 3 | Two Sum II | Medium | Two Pointers (Sorted Data) |
| 4 | Best Time to Buy and Sell Stock | Easy | Sliding Window (Dynamic) |
| 5 | Longest Repeating Character Replacement | Medium | Sliding Window (Dynamic) |
| 6 | Minimum Window Substring | Hard | Sliding Window (Dynamic) |

---

## ⚠️ Common Mistakes

- **Incorrect loop bounds**: `left < right` vs `left <= right`. Depends on if the pointers crossing/overlapping is logically valid for the specific problem.
- **Forgetting to update the window state**: When moving `left++`, you MUST remember to remove `nums[left]` from the cumulative sum, seen Set, or frequency map.
- **Using a set when a map is needed**: A Set works for "all unique characters", but a Map/hash table is required for tracking frequencies or specific index occurrences (e.g. at most 2 distinct characters).

---

**← Previous:** [14 — Greedy](./14-Greedy.md) | **Next →** [16 — Tries](../Data%20Structures/16-Tries.md)
