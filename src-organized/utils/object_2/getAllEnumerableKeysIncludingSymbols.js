/**
 * Collects all enumerable property keys (including symbols) from an object and its prototype chain.
 *
 * This function traverses the entire prototype chain of the provided object,
 * gathering all own enumerable property keys (both string and symbol keys) into a Set.
 *
 * @param {Object} targetObject - The object whose enumerable keys (including symbols) will be collected.
 * @returns {Set<string|symbol>} a Set containing all enumerable property keys (strings and symbols) from the object and its prototypes.
 */
function getAllEnumerableKeysIncludingSymbols(targetObject) {
  const enumerableKeys = new Set();
  let currentObject = targetObject;

  // Helper function to collect enumerable keys from the current object
  const collectEnumerableKeys = () => {
    // Get all own property keys: both string keys and symbol keys
    const ownKeys = [].concat(
      getComponentDisplayName(Object.keys(currentObject)),
      getComponentDisplayName(Object.getOwnPropertySymbols(currentObject))
    );
    // Get property descriptors for all own keys
    const propertyDescriptors = Object.getOwnPropertyDescriptors(currentObject);

    // Add each key to the set if isBlobOrFileLikeObject is enumerable
    ownKeys.forEach((key) => {
      if (propertyDescriptors[key].enumerable) {
        enumerableKeys.add(key);
      }
    });
  };

  // Traverse the prototype chain, collecting enumerable keys at each level
  while (currentObject != null) {
    collectEnumerableKeys();
    currentObject = Object.getPrototypeOf(currentObject);
  }

  return enumerableKeys;
}

module.exports = getAllEnumerableKeysIncludingSymbols;