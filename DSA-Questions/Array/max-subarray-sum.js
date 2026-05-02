// 4. Find the maximum subarray sum (Kadane's Algorithm)

const maxSubarraySum = (arr) => {
    let maxSoFar = arr[0];
    let current = arr[0];

    for (let i = 1; i < arr.length; i++) {
        current = Math.max(arr[i], current + arr[i]);
        maxSoFar = Math.max(maxSoFar, current);
    }

    return maxSoFar;
}
