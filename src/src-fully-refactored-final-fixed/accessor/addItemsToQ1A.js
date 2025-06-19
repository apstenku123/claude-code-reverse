/**
 * Adds one or more items to the global q1A array.
 *
 * @param {...any} items - The items to add to the q1A array.
 * @returns {void}
 */
function addItemsToQ1A(...items) {
  // Spread the provided items into the q1A array
  q1A.push(...items);
}

module.exports = addItemsToQ1A;