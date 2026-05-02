// 4. Check if a string is a palindrome using deque.

const isPalindromeDeque = (str) => {
    const deque = str.toLowerCase().split("");

    while (deque.length > 1) {
        let front = deque.shift();
        let rear = deque.pop();
        if (front !== rear) return false;
    }

    return true;
}
