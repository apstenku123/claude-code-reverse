/**
 * Creates a shallow copy of an object, excluding the specified property keys (including symbol keys).
 *
 * This function copies all enumerable own properties from the source object, except those whose keys
 * are listed in the `excludedKeys` array. It also handles symbol properties, ensuring that only
 * enumerable symbols not present in `excludedKeys` are copied.
 *
 * @param {Object} sourceObject - The object to copy properties from.
 * @param {Array<string|Symbol>} excludedKeys - An array of property keys (string or symbol) to exclude from the copy.
 * @returns {Object} a new object containing the copied properties, excluding those specified.
 */
function copyObjectExcludingPropertiesAndSymbols(sourceObject, excludedKeys) {
  if (sourceObject == null) {
    // Return empty object if source is null or undefined
    return {};
  }

  // initializeWithLanes is assumed to be a helper function that copies enumerable string-keyed properties,
  // excluding those in excludedKeys. It is used here as a base copy.
  const result = initializeWithLanes(sourceObject, excludedKeys);

  // If the environment supports symbol properties, process them as well
  if (Object.getOwnPropertySymbols) {
    const symbolKeys = Object.getOwnPropertySymbols(sourceObject);
    for (let i = 0; i < symbolKeys.length; i++) {
      const symbolKey = symbolKeys[i];
      // Skip symbols that are in the excludedKeys array
      if (excludedKeys.indexOf(symbolKey) >= 0) continue;
      // Only copy enumerable symbol properties
      if (!Object.prototype.propertyIsEnumerable.call(sourceObject, symbolKey)) continue;
      result[symbolKey] = sourceObject[symbolKey];
    }
  }

  return result;
}

module.exports = copyObjectExcludingPropertiesAndSymbols;