/**
 * Collects all [object, propertyKey] pairs for the given object and its prototype chain (excluding Object.prototype).
 *
 * For each object in the prototype chain (starting from the input object and stopping before Object.prototype),
 * this function collects all own property keys (including symbols) and pairs them with the object they belong to.
 * The result is a Set of [object, propertyKey] pairs.
 *
 * @param {Object} targetObject - The object whose own property keys and prototype chain will be traversed.
 * @returns {Set<[Object, string|symbol]>} a Set containing [object, propertyKey] pairs for all own properties of the object and its prototypes (excluding Object.prototype).
 */
function getAllOwnPropertyPairsWithPrototypes(targetObject) {
  const propertyPairs = new Set();
  let currentObject = targetObject;

  // Traverse the prototype chain, stopping before Object.prototype
  do {
    // For each own property key (including symbols) of the current object
    for (const propertyKey of Reflect.ownKeys(currentObject)) {
      // Add a pair [currentObject, propertyKey] to the set
      propertyPairs.add([currentObject, propertyKey]);
    }
    // Move up the prototype chain
    currentObject = Reflect.getPrototypeOf(currentObject);
  } while (currentObject && currentObject !== Object.prototype);

  return propertyPairs;
}

module.exports = getAllOwnPropertyPairsWithPrototypes;
