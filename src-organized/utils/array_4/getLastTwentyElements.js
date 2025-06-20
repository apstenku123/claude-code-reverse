/**
 * Returns the last 20 elements from the provided array or string.
 *
 * @param {string|Array} sourceCollection - The array or string to extract elements from.
 * @returns {string|Array} The last 20 elements of the input array or string. If the input has fewer than 20 elements, returns the entire input.
 */
function getLastTwentyElements(sourceCollection) {
  // Use slice with a negative index to get the last 20 elements
  return sourceCollection.slice(-20);
}

module.exports = getLastTwentyElements;