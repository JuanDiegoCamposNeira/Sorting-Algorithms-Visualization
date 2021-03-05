export function heap_sort(array) {
  let sorted_array = array;
  let upper_bound = array.length;
  // Convert the array into a max-heap
  build_max_heap(array, upper_bound);
  // Sort the actual heap
  while (upper_bound > 0) {
    let aux = array[0];
    array[0] = array[--upper_bound];
    array[upper_bound] = aux;

    max_heapify(array, 0, upper_bound);
  }
  return sorted_array;
}

// Function to build the max heap
function build_max_heap(sorted_array, upper_bound) {
  let size = upper_bound / 2 - 1;
  for (let i = size; i >= 0; i--) {
    max_heapify(sorted_array, i, upper_bound);
  }
}

// Function that will help to sort the array
function max_heapify(sorted_array, index, upper_bound) {
  // Root and childrens
  let root = index;
  let rigth_children = 2 * index + 1;
  let left_children = 2 * index + 2;

  if (sorted_array[root] < sorted_array[left_children] && left_children < upper_bound)
    root = left_children;

  if (sorted_array[root] < sorted_array[rigth_children] && rigth_children < upper_bound)
    root = rigth_children;

  if (index !== root) {
    let aux = sorted_array[root];
    sorted_array[root] = sorted_array[index];
    sorted_array[index] = aux;

    max_heapify(sorted_array, root, upper_bound);
  }
}
