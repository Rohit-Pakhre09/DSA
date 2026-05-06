// 3. Check if parentheses are balanced in a string.

const isBalanced = (str) => {
    const stack = [];
    const open = "({[";
    const close = ")}]";
    const map = { ')': '(', '}': '{', ']': '[' };

    for (let ch of str) {
        if (open.includes(ch)) {
            stack.push(ch);
        } else if (close.includes(ch)) {
            if (stack.pop() !== map[ch]) return false;
        }
    }

    return stack.length === 0;
}
