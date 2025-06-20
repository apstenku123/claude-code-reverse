/**
 * Removes and returns the root element from a min-heap array, then restores the heap property.
 *
 * @param {Array<any>} heapArray - The array representing a binary min-heap.
 * @param {Function} compareFn - Comparison function: should return negative if first argument < second argument.
 * @returns {any|null} The root element of the heap, or null if the heap is empty.
 */
function extractMinHeapRoot(heapArray, compareFn) {
  if (heapArray.length === 0) return null;

  // Save the root element to return later
  const rootElement = heapArray[0];
  // Remove the last element from the heap
  const lastElement = heapArray.pop();

  // If the heap is not empty after popping, restore the heap property
  if (lastElement !== rootElement) {
    heapArray[0] = lastElement;
    let currentIndex = 0;
    const heapSize = heapArray.length;
    const halfSize = heapSize >>> 1; // Only need to heapify down to the last parent node

    // Sift down the element at the root to restore the min-heap property
    while (currentIndex < halfSize) {
      const leftChildIndex = 2 * (currentIndex + 1) - 1;
      const leftChild = heapArray[leftChildIndex];
      const rightChildIndex = leftChildIndex + 1;
      const rightChild = heapArray[rightChildIndex];

      // If left child is less than the element to sift down
      if (compareFn(leftChild, lastElement) < 0) {
        // If right child exists and is less than left child, swap with right child
        if (
          rightChildIndex < heapSize &&
          compareFn(rightChild, leftChild) < 0
        ) {
          heapArray[currentIndex] = rightChild;
          heapArray[rightChildIndex] = lastElement;
          currentIndex = rightChildIndex;
        } else {
          // Otherwise, swap with left child
          heapArray[currentIndex] = leftChild;
          heapArray[leftChildIndex] = lastElement;
          currentIndex = leftChildIndex;
        }
      } else if (
        rightChildIndex < heapSize &&
        compareFn(rightChild, lastElement) < 0
      ) {
        // If right child exists and is less than the element to sift down, swap with right child
        heapArray[currentIndex] = rightChild;
        heapArray[rightChildIndex] = lastElement;
        currentIndex = rightChildIndex;
      } else {
        // Heap property is restored
        break;
      }
    }
  }

  return rootElement;
}

module.exports = extractMinHeapRoot;