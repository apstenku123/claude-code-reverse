/**
 * Processes a list of configuration items, applies a predicate function to each,
 * and accumulates the results in an output object using custom key/value transformations.
 *
 * @param {Object} sourceObject - The source object used for value extraction and key transformation.
 * @param {Array} configList - An array of configuration items to process.
 * @param {Function} predicateFn - a function that receives (value, configItem) and returns a boolean.
 * @returns {Object} An object mapping transformed keys to values for which the predicate returned true.
 */
function processConfigWithPredicate(sourceObject, configList, predicateFn) {
  const result = {};
  const configListLength = configList.length;

  // Iterate over each configuration item
  for (let index = 0; index < configListLength; index++) {
    const configItem = configList[index];
    // Extract value from the source object using Ly (external dependency)
    const extractedValue = Ly(sourceObject, configItem);

    // Apply the predicate function to determine if this item should be included
    if (predicateFn(extractedValue, configItem)) {
      // Transform the key using Tq (external dependency)
      const transformedKey = Tq(configItem, sourceObject);
      // Add the key-value pair to the result using S4A (external dependency)
      S4A(result, transformedKey, extractedValue);
    }
  }

  return result;
}

module.exports = processConfigWithPredicate;