// 4. Evaluate a postfix expression.

const evalPostfix = (expr) => {
    const stack = [];
    const tokens = expr.split(" ");

    for (let token of tokens) {
        if (!isNaN(token)) {
            stack.push(Number(token));
        } else {
            let b = stack.pop();
            let a = stack.pop();

            if (token === '+') stack.push(a + b);
            else if (token === '-') stack.push(a - b);
            else if (token === '*') stack.push(a * b);
            else if (token === '/') stack.push(Math.floor(a / b));
        }
    }

    return stack[0];
}
