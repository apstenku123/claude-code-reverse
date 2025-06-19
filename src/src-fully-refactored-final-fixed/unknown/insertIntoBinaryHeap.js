/**
 * Inserts a new element into a binary heap and maintains the heap property by percolating the new element up.
 *
 * @param {Array<any>} heap - The binary heap array where the new element will be inserted.
 * @param {any} newElement - The element to insert into the heap.
 * @returns {void}
 *
 * The function mutates the original heap array by adding the new element and reordering elements as needed.
 */
function insertIntoBinaryHeap(heap, newElement) {
  // Start at the index where the new element will be inserted
  let currentIndex = heap.length;
  // Add the new element to the end of the heap
  heap.push(newElement);

  // Percolate the new element up to restore the heap property
  while (currentIndex > 0) {
    // Calculate the parent index
    const parentIndex = (currentIndex - 1) >>> 1;
    const parentValue = heap[parentIndex];

    // If the parent is greater than the new element (assuming min-heap), swap them
    if (compareBySortIndexAndId(parentValue, newElement) > 0) {
      heap[parentIndex] = newElement;
      heap[currentIndex] = parentValue;
      currentIndex = parentIndex;
    } else {
      // Heap property is satisfied, stop percolating
      break;
    }
  }
}

module.exports = insertIntoBinaryHeap;