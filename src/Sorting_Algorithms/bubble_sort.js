export function bubble_sort(array) {
  let visualize = [];
  let indexes = [];
  let len = array.length;
  let i, j;

  for (i = 0; i < len; i++) {
    for (j = 0; j < len; j++) {
      if (array[j] > array[j + 1]) {
        let tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      }
      // The tree dots copy the array, not the reference
      visualize.push([...array]);
      indexes.push([i, j]);
    }
  }
  return [visualize, indexes];
}
