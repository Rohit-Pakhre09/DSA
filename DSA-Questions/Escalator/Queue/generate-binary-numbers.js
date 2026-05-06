// 5. Generate binary numbers from 1 to n using a queue.

const generateBinary = (n) => {
    const result = [];
    const queue = ["1"];

    for (let i = 0; i < n; i++) {
        let front = queue.shift();
        result.push(front);

        queue.push(front + "0");
        queue.push(front + "1");
    }

    return result;
}
