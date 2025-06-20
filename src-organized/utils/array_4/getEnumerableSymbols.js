/**
 * Retrieves all enumerable symbol properties from the given object.
 *
 * @param {Object} targetObject - The object from which to extract enumerable symbol properties.
 * @returns {Symbol[]} An array of enumerable symbol properties found on the object.
 */
function getEnumerableSymbols(targetObject) {
  // Check if the environment supports symbol properties
  if (typeof Object.getOwnPropertySymbols !== 'function') {
    return [];
  }

  // Get all symbol properties, then filter to only those that are enumerable
  return Object.getOwnPropertySymbols(targetObject).filter((symbol) => {
    return Object.propertyIsEnumerable.call(targetObject, symbol);
  });
}

module.exports = getEnumerableSymbols;