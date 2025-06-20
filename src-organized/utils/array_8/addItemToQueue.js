/**
 * Adds an item to the global processing queue.
 *
 * @param {*} item - The item to be added to the queue.
 * @returns {void}
 */
function addItemToQueue(item) {
  // Add the provided item to the end of the queue array
  QZ.push(item);
}

module.exports = addItemToQueue;