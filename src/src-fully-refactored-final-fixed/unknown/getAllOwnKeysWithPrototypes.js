/**
 * Collects all own property keys (including symbols) from an object and its prototype chain (excluding Object.prototype).
 * Each entry in the returned Set is a tuple [object, key], where 'object' is the prototype in the chain and 'key' is its own property key.
 *
 * @param {Object} targetObject - The object whose own keys and prototype chain keys will be collected.
 * @returns {Set<[Object, string|symbol]>} a Set of [object, key] pairs for all own keys in the prototype chain.
 */
function getAllOwnKeysWithPrototypes(targetObject) {
  const objectKeyPairs = new Set();
  let currentObject = targetObject;

  // Traverse the prototype chain up to, but not including, Object.prototype
  do {
    // Get all own property keys (including symbols) of the current object
    for (const propertyKey of Reflect.ownKeys(currentObject)) {
      // Store the pair [object, key] in the set
      objectKeyPairs.add([currentObject, propertyKey]);
    }
    // Move up the prototype chain
    currentObject = Reflect.getPrototypeOf(currentObject);
  } while (currentObject && currentObject !== Object.prototype);

  return objectKeyPairs;
}

module.exports = getAllOwnKeysWithPrototypes;