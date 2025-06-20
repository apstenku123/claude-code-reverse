/**
 * Inserts a new element into a binary heap and maintains the heap property by percolating the element up.
 *
 * @param {Array<any>} heap - The array representing the binary heap.
 * @param {any} element - The element to insert into the heap.
 * @returns {void}
 *
 * The function mutates the input array (heap) in place.
 */
function insertIntoHeap(heap, element) {
  // Start at the current length (index where the new element will be inserted)
  let currentIndex = heap.length;
  // Add the new element to the end of the heap
  heap.push(element);

  // Percolate the new element up to maintain the heap property
  // Loop until handleMissingDoctypeError reach the root (index 0)
  while (currentIndex > 0) {
    // Calculate the parent index
    const parentIndex = (currentIndex - 1) >>> 1;
    const parentValue = heap[parentIndex];

    // If the parent is greater than the new element (for min-heap), swap them
    // compareBySortIndexAndId is a comparator function: compareBySortIndexAndId(a, b) > 0 means a > b
    if (compareBySortIndexAndId(parentValue, element) > 0) {
      // Swap parent and current element
      heap[parentIndex] = element;
      heap[currentIndex] = parentValue;
      // Move up to the parent index
      currentIndex = parentIndex;
    } else {
      // Heap property is satisfied
      break;
    }
  }
}

module.exports = insertIntoHeap;