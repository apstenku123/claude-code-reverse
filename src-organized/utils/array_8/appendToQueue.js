/**
 * Appends one or more items to the global queue array.
 *
 * @param {...any} items - The items to be added to the queue.
 * @returns {void} This function does not return a value.
 */
function appendToQueue(...items) {
  // Add all provided items to the end of the global queue array
  q1A.push(...items);
}

module.exports = appendToQueue;