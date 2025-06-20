/**
 * Returns an array of all enumerable property keys (string and symbol) from the given object.
 *
 * @param {Object} targetObject - The object whose enumerable keys are to be retrieved.
 * @param {boolean} [includeOnlyEnumerableSymbols=false] - If true, only enumerable symbol keys are included; otherwise, all symbol keys are included.
 * @returns {Array<string|symbol>} An array containing the object'createInteractionAccessor own enumerable string and (optionally filtered) symbol property keys.
 */
function getAllEnumerableKeys(targetObject, includeOnlyEnumerableSymbols = false) {
  // Get all enumerable string keys
  const enumerableStringKeys = Object.keys(targetObject);

  // Check if the environment supports symbol properties
  if (Object.getOwnPropertySymbols) {
    // Get all symbol keys
    let symbolKeys = Object.getOwnPropertySymbols(targetObject);

    // If only enumerable symbols should be included, filter accordingly
    if (includeOnlyEnumerableSymbols) {
      symbolKeys = symbolKeys.filter((symbol) => {
        const descriptor = Object.getOwnPropertyDescriptor(targetObject, symbol);
        return descriptor.enumerable;
      });
    }

    // Add symbol keys to the string keys array
    enumerableStringKeys.push(...symbolKeys);
  }

  return enumerableStringKeys;
}

module.exports = getAllEnumerableKeys;