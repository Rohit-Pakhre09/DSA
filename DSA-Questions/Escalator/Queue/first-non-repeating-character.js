// 3. Find the first non-repeating character in a stream.

const firstNonRepeating = (stream) => {
    const count = {};
    const queue = [];
    const result = [];

    for (let ch of stream) {
        count[ch] = (count[ch] || 0) + 1;

        if (count[ch] === 1) {
            queue.push(ch);
        }

        while (queue.length && count[queue[0]] > 1) {
            queue.shift();
        }

        result.push(queue.length === 0 ? -1 : queue[0]);
    }

}
