/**
 * Appends one or more items to the global queue array.
 *
 * @param {...any} items - The items to be added to the queue.
 * @returns {void}
 */
function appendItemsToQueue(...items) {
  // Push all provided items into the global queue array
  q1A.push(...items);
}

module.exports = appendItemsToQueue;