/**
 * Adds all enumerable own property keys (string and symbol) of the given object to the provided Set.
 * The function uses a helper function `getComponentDisplayName` to process the keys and symbols arrays before concatenation.
 *
 * @param {Object} targetObject - The object whose enumerable own property keys will be added to the set.
 * @param {Set} keySet - The Set to which the enumerable property keys will be added.
 * @param {Function} getComponentDisplayName - a helper function applied to the arrays of keys and symbols before concatenation.
 * @returns {Object} The prototype of the targetObject after processing.
 */
function addEnumerableKeysToSetFromObject(targetObject, keySet, getComponentDisplayName) {
  // Get all own property names (string keys) and symbols, process them with getComponentDisplayName, and combine into one array
  const allOwnKeys = [
    ...getComponentDisplayName(Object.keys(targetObject)),
    ...getComponentDisplayName(Object.getOwnPropertySymbols(targetObject))
  ];

  // Get property descriptors for all own properties
  const propertyDescriptors = Object.getOwnPropertyDescriptors(targetObject);

  // Add each enumerable property key to the set
  allOwnKeys.forEach(function (propertyKey) {
    if (propertyDescriptors[propertyKey].enumerable) {
      keySet.add(propertyKey);
    }
  });

  // Return the prototype of the object for potential further processing
  return Object.getPrototypeOf(targetObject);
}

module.exports = addEnumerableKeysToSetFromObject;