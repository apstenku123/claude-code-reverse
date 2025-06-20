/**
 * Collects all enumerable property keys (including symbols) from an object and its prototype chain.
 *
 * This function traverses the prototype chain of the provided object, collecting all enumerable property keys
 * (both string keys and symbol keys) at each level. The result is a Set containing all such keys, without duplicates.
 *
 * @param {Object} targetObject - The object whose enumerable keys (including from prototypes) are to be collected.
 * @returns {Set<string|Symbol>} a Set containing all enumerable property keys (strings and symbols) found in the object and its prototypes.
 */
function getAllEnumerableKeysIncludingPrototypes(targetObject) {
  const enumerableKeys = new Set();
  let currentObject = targetObject;

  // Helper function to collect enumerable keys from the current object
  const collectEnumerableKeys = () => {
    // Get all own property keys: string keys and symbol keys
    const ownKeys = [
      ...getComponentDisplayName(Object.keys(currentObject)),
      ...getComponentDisplayName(Object.getOwnPropertySymbols(currentObject))
    ];
    // Get property descriptors for all own properties
    const propertyDescriptors = Object.getOwnPropertyDescriptors(currentObject);
    // Add each enumerable key to the set
    ownKeys.forEach((key) => {
      if (propertyDescriptors[key] && propertyDescriptors[key].enumerable) {
        enumerableKeys.add(key);
      }
    });
    // Move up the prototype chain
    currentObject = Object.getPrototypeOf(currentObject);
  };

  // Traverse the prototype chain, collecting enumerable keys at each level
  while (currentObject != null) {
    collectEnumerableKeys();
  }

  return enumerableKeys;
}

module.exports = getAllEnumerableKeysIncludingPrototypes;