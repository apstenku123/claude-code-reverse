/**
 * Collects all own property keys from an object and its prototype chain (excluding Object.prototype),
 * returning a Set of [object, key] pairs for each key found at each prototype level.
 *
 * @param {Object} targetObject - The object whose own property keys and prototypes will be traversed.
 * @returns {Set<[Object, string|symbol]>} a Set containing [object, key] pairs for each own key at each prototype level.
 */
function collectOwnKeysWithPrototypes(targetObject) {
  const objectKeyPairs = new Set();
  let currentObject = targetObject;

  // Traverse the prototype chain until reaching Object.prototype
  do {
    // For each own property key (string or symbol) of the current object
    for (const propertyKey of Reflect.ownKeys(currentObject)) {
      // Add a tuple [currentObject, propertyKey] to the set
      objectKeyPairs.add([currentObject, propertyKey]);
    }
    // Move up the prototype chain
    currentObject = Reflect.getPrototypeOf(currentObject);
  } while (currentObject && currentObject !== Object.prototype);

  return objectKeyPairs;
}

module.exports = collectOwnKeysWithPrototypes;
