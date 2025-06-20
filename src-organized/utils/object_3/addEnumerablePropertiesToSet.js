/**
 * Adds all enumerable own property keys (including symbols) of the given object to the provided Set.
 * This function uses a helper function `getComponentDisplayName` to process the property keys array before adding them.
 *
 * @param {Object} targetObject - The object whose enumerable properties will be added to the set.
 * @param {Set} propertySet - The Set to which enumerable property keys will be added.
 * @param {Function} getComponentDisplayName - a helper function to process arrays of property keys (e.g., for deduplication or transformation).
 * @returns {Object} The prototype of the targetObject after processing.
 */
function addEnumerablePropertiesToSet(targetObject, propertySet, getComponentDisplayName) {
  // Get all own property keys (string and symbol), processed by getComponentDisplayName
  const ownPropertyKeys = [
    ...getComponentDisplayName(Object.keys(targetObject)),
    ...getComponentDisplayName(Object.getOwnPropertySymbols(targetObject))
  ];

  // Get property descriptors for all own properties
  const propertyDescriptors = Object.getOwnPropertyDescriptors(targetObject);

  // Add each enumerable property key to the set
  ownPropertyKeys.forEach((propertyKey) => {
    if (propertyDescriptors[propertyKey].enumerable) {
      propertySet.add(propertyKey);
    }
  });

  // Return the prototype of the target object for potential further processing
  return Object.getPrototypeOf(targetObject);
}

module.exports = addEnumerablePropertiesToSet;