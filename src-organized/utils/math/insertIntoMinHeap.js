/**
 * Inserts a new element into a binary min-heap and maintains the heap property.
 *
 * @param {Array<any>} heap - The array representing the binary min-heap.
 * @param {any} element - The element to insert into the heap.
 * @returns {void}
 *
 * The function mutates the input array by inserting the new element and reordering elements as necessary.
 *
 * @example
 * const heap = [1, 3, 5];
 * insertIntoMinHeap(heap, 2); // heap is now [1, 2, 5, 3] (structure may vary)
 */
function insertIntoMinHeap(heap, element) {
  let currentIndex = heap.length;
  heap.push(element);
  // Bubble up the new element to maintain the min-heap property
  while (currentIndex > 0) {
    // Calculate the parent index
    const parentIndex = (currentIndex - 1) >>> 1;
    const parentValue = heap[parentIndex];
    // If the parent is greater than the new element, swap them
    if (compareBySortIndexAndId(parentValue, element) > 0) {
      heap[parentIndex] = element;
      heap[currentIndex] = parentValue;
      currentIndex = parentIndex;
    } else {
      // Heap property is satisfied
      break;
    }
  }
}

module.exports = insertIntoMinHeap;