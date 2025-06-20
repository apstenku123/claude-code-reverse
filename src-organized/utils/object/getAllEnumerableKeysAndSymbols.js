/**
 * Returns all own property keys (string and symbol) of an object, optionally filtering symbols to only enumerable ones.
 *
 * @param {Object} targetObject - The object whose own property keys and symbols are to be retrieved.
 * @param {boolean} [onlyEnumerableSymbols=false] - If true, only includes enumerable symbol properties.
 * @returns {Array<string|Symbol>} Array of own property keys (strings and symbols) of the object.
 */
function getAllEnumerableKeysAndSymbols(targetObject, onlyEnumerableSymbols = false) {
  // Get all own string property keys
  const propertyKeys = Object.keys(targetObject);

  // If the environment supports symbols, process them
  if (typeof Object.getOwnPropertySymbols === 'function') {
    let symbolKeys = Object.getOwnPropertySymbols(targetObject);

    // Optionally filter to only enumerable symbols
    if (onlyEnumerableSymbols) {
      symbolKeys = symbolKeys.filter((symbol) => {
        const descriptor = Object.getOwnPropertyDescriptor(targetObject, symbol);
        return descriptor && descriptor.enumerable;
      });
    }

    // Add symbol keys to the result
    propertyKeys.push(...symbolKeys);
  }

  return propertyKeys;
}

module.exports = getAllEnumerableKeysAndSymbols;
