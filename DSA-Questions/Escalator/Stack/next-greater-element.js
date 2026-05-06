// 5. Find the next greater element for each element in an array.

const nextGreaterElement = (arr) => {
    const result = new Array(arr.length).fill(-1);
    const stack = [];

    for (let i = 0; i < arr.length; i++) {
        while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
            let idx = stack.pop();
            result[idx] = arr[i];
        }
        stack.push(i);
    }

    return result;
}
