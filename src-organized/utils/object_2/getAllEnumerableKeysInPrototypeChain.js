/**
 * Collects all enumerable property keys (including symbols) from an object and its prototype chain.
 *
 * This function traverses the prototype chain of the provided object, collecting all own enumerable property keys
 * (both string keys and symbol keys) at each level. The result is a Set containing all such keys found in the chain.
 *
 * @param {Object} targetObject - The object whose enumerable property keys (including symbols) will be collected from its prototype chain.
 * @returns {Set<string|symbol>} a Set containing all enumerable property keys (strings and symbols) from the object and its prototype chain.
 */
function getAllEnumerableKeysInPrototypeChain(targetObject) {
  const enumerableKeys = new Set();
  let currentObject = targetObject;

  // Helper function to collect enumerable keys at the current prototype level
  const collectEnumerableKeys = () => {
    // Get all own property keys (string and symbol) of the current object
    const ownKeys = [
      ...getComponentDisplayName(Object.keys(currentObject)),
      ...getComponentDisplayName(Object.getOwnPropertySymbols(currentObject))
    ];
    const propertyDescriptors = Object.getOwnPropertyDescriptors(currentObject);

    // Add keys to the set if they are enumerable
    ownKeys.forEach((key) => {
      if (propertyDescriptors[key].enumerable) {
        enumerableKeys.add(key);
      }
    });
    // Move up the prototype chain
    currentObject = Object.getPrototypeOf(currentObject);
  };

  // Traverse the prototype chain
  while (currentObject != null) {
    collectEnumerableKeys();
  }

  return enumerableKeys;
}

module.exports = getAllEnumerableKeysInPrototypeChain;