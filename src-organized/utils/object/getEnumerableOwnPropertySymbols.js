/**
 * Returns an array of the object'createInteractionAccessor own enumerable symbol properties.
 *
 * @param {Object} targetObject - The object whose enumerable symbol properties will be retrieved.
 * @returns {Symbol[]} An array of enumerable symbol properties found directly on the object.
 */
function getEnumerableOwnPropertySymbols(targetObject) {
  // Check if the environment supports Object.getOwnPropertySymbols
  if (typeof Object.getOwnPropertySymbols !== 'function') {
    return [];
  }

  // Get all symbol properties of the object
  const allSymbols = Object.getOwnPropertySymbols(targetObject);

  // Filter symbols to include only those that are enumerable
  const enumerableSymbols = allSymbols.filter((symbol) =>
    Object.propertyIsEnumerable.call(targetObject, symbol)
  );

  return enumerableSymbols;
}

module.exports = getEnumerableOwnPropertySymbols;