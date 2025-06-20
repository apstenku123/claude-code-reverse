/**
 * Creates a shallow copy of an object, excluding properties whose keys are listed in the excludedKeys array.
 * Also copies enumerable symbol properties not present in the excludedKeys array.
 *
 * @param {Object} sourceObject - The object to copy properties from.
 * @param {Array<string|Symbol>} excludedKeys - Array of property keys (string or Symbol) to exclude from the copy.
 * @returns {Object} a new object with the selected properties copied from the source object.
 */
function copyObjectExcludingProperties(sourceObject, excludedKeys) {
  if (sourceObject == null) return {};

  // initializeWithLanes is assumed to be a helper that copies enumerable string-keyed properties except those in excludedKeys
  const copiedObject = initializeWithLanes(sourceObject, excludedKeys);

  // If the environment supports symbol properties, handle them as well
  if (Object.getOwnPropertySymbols) {
    const symbolKeys = Object.getOwnPropertySymbols(sourceObject);
    for (let i = 0; i < symbolKeys.length; i++) {
      const symbolKey = symbolKeys[i];
      // Skip if the symbol is in the excludedKeys array
      if (excludedKeys.indexOf(symbolKey) >= 0) continue;
      // Only copy enumerable symbol properties
      if (!Object.prototype.propertyIsEnumerable.call(sourceObject, symbolKey)) continue;
      copiedObject[symbolKey] = sourceObject[symbolKey];
    }
  }

  return copiedObject;
}

module.exports = copyObjectExcludingProperties;