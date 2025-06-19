/**
 * Adds all enumerable own property keys (including symbols) of the given object to a provided Set.
 * The function uses a helper function `getComponentDisplayName` to process the property keys array before adding them.
 *
 * @param {Object} sourceObject - The object whose enumerable own property keys will be added to the Set.
 * @param {Set} targetSet - The Set to which enumerable property keys will be added.
 * @param {Function} processKeys - a function that processes an array of property keys (e.g., for deduplication or transformation).
 */
function addEnumerablePropertiesToSetFromObject(sourceObject, targetSet, processKeys) {
  // Get all own property names (string keys) and symbols, process them, and concatenate into a single array
  const propertyKeys = [].concat(
    processKeys(Object.keys(sourceObject)),
    processKeys(Object.getOwnPropertySymbols(sourceObject))
  );

  // Get property descriptors for all own properties
  const propertyDescriptors = Object.getOwnPropertyDescriptors(sourceObject);

  // Add each enumerable property key to the target set
  propertyKeys.forEach(function (propertyKey) {
    if (propertyDescriptors[propertyKey] && propertyDescriptors[propertyKey].enumerable) {
      targetSet.add(propertyKey);
    }
  });

  // Move up the prototype chain (if needed elsewhere)
  // Note: This line does not affect the outer scope'createInteractionAccessor sourceObject
  sourceObject = Object.getPrototypeOf(sourceObject);
}

module.exports = addEnumerablePropertiesToSetFromObject;