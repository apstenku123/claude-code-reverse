/**
 * Iterates over an array, applies a callback to each element with a computed value, and accumulates the result.
 *
 * @param {Array} items - The array of items to process.
 * @param {Function} callback - The function to call for each item. Receives (accumulator, item, computedValue, itemsArray).
 * @param {Function} computeValue - Function to compute a value from each item. Receives (item).
 * @param {*} accumulator - The initial accumulator value, which is updated by the callback.
 * @returns {*} The final accumulated value after processing all items.
 */
function processArrayWithCallbackAndAccumulator(items, callback, computeValue, accumulator) {
  const itemCount = items == null ? 0 : items.length;
  // Iterate over each item in the array
  for (let index = 0; index < itemCount; index++) {
    const currentItem = items[index];
    const computedValue = computeValue(currentItem);
    // Call the callback with the accumulator, current item, computed value, and the original array
    callback(accumulator, currentItem, computedValue, items);
  }
  // Return the final accumulated value
  return accumulator;
}

module.exports = processArrayWithCallbackAndAccumulator;