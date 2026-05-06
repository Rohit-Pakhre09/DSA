// 5. Design a sliding window minimum problem using deque.

const slidingWindowMin = (arr, k) => {
    const result = [];
    const deque = [];

    for (let i = 0; i < arr.length; i++) {
        if (deque.length && deque[0] < i - k + 1) deque.shift();

        while (deque.length && arr[deque[deque.length - 1]] > arr[i]) {
            deque.pop();
        }

        deque.push(i);

        if (i >= k - 1) result.push(arr[deque[0]]);
    }

    return result;
}
