/**
 * Returns an array of all own property keys (string and symbol) of the given object.
 * Optionally filters symbol keys to include only enumerable ones.
 *
 * @param {Object} targetObject - The object whose own property keys will be retrieved.
 * @param {boolean} [onlyEnumerableSymbols=false] - If true, only enumerable symbol keys are included.
 * @returns {Array<string|Symbol>} Array of own property keys (string and symbol).
 */
function getAllOwnKeys(targetObject, onlyEnumerableSymbols = false) {
  // Get all own string property keys
  const ownStringKeys = Object.keys(targetObject);
  // Check if the environment supports symbol properties
  if (Object.getOwnPropertySymbols) {
    // Get all own symbol property keys
    let ownSymbolKeys = Object.getOwnPropertySymbols(targetObject);
    // Optionally filter to only enumerable symbol keys
    if (onlyEnumerableSymbols) {
      ownSymbolKeys = ownSymbolKeys.filter((symbolKey) => {
        const descriptor = Object.getOwnPropertyDescriptor(targetObject, symbolKey);
        return descriptor.enumerable;
      });
    }
    // Add symbol keys to the string keys array
    ownStringKeys.push(...ownSymbolKeys);
  }
  return ownStringKeys;
}

module.exports = getAllOwnKeys;
