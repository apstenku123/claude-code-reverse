/**
 * Recursively freezes an object and its nested properties, making isBlobOrFileLikeObject immutable.
 * For Map and Set instances, overrides mutating methods to throw errors, enforcing read-only behavior.
 *
 * @param {Object|Map|Set} target - The object, Map, or Set to deeply freeze and make read-only.
 * @returns {Object|Map|Set} The deeply frozen and read-only object, Map, or Set.
 */
function deepFreezeWithReadOnlyCollections(target) {
  // If the target is a Map, override mutating methods to throw errors
  if (target instanceof Map) {
    target.set = target.delete = target.clear = function () {
      throw new Error("map is read-only");
    };
  } else if (target instanceof Set) {
    // If the target is a Set, override mutating methods to throw errors
    target.add = target.delete = target.clear = function () {
      throw new Error("set is read-only");
    };
  }

  // Freeze the object to prevent further modifications
  Object.freeze(target);

  // Recursively freeze all nested properties that are objects and not already frozen
  Object.getOwnPropertyNames(target).forEach(function (propertyName) {
    const propertyValue = target[propertyName];
    if (typeof propertyValue === "object" && propertyValue !== null && !Object.isFrozen(propertyValue)) {
      deepFreezeWithReadOnlyCollections(propertyValue);
    }
  });

  return target;
}

module.exports = deepFreezeWithReadOnlyCollections;