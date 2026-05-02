// 2. Rotate an array to the right by k steps.

const rotateArray = (arr, k) => {
    k = k % arr.length;

    function reverse(start, end) {
        while(start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        }
    }

    reverse(0, arr.length - 1);
    reverse(0, k - 1);
    reverse(k, arr.length - 1);

    return arr;
}
