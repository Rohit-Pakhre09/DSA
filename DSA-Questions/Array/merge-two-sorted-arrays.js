// 5. Merge two sorted arrays without using extra space

const mergeSortedArrays = (arr1, arr2) => {
    let i = arr1.length - 1;
    let j = 0;

    while (i >= 0 && j < arr2.length) {
        if (arr1[i] > arr2[j]) {
            [arr1[i], arr2[j]] = [arr2[j], arr1[i]];
        }
        i--;
        j++;
    }

    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);

    return [arr1, arr2];
}
