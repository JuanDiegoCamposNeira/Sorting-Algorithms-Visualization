export function insertion_sort(array) {
  // Copy the array
  let sorted_array = array;
  let visualize = [];
  let indexes = [];

  // Iterate thru the array to sort it
  for (let i = 1; i < sorted_array.length; i++) {
    let index = i;
    // Find the correct position for the current number in the left-half part
    while (index > 0 && sorted_array[index] < sorted_array[index - 1]) {
      let aux = sorted_array[index - 1];
      sorted_array[index - 1] = sorted_array[index];
      sorted_array[index] = aux;
      index--;
      // Push the array to the visualize array
      visualize.push([...sorted_array]); // The tree dots copy the array, not the reference
      let index2 = index - 1 >= 0 ? index - 1 : 0;
      indexes.push([index, index2]);
    }
  }
  // Return the sorted array
  return [visualize, indexes];
}
