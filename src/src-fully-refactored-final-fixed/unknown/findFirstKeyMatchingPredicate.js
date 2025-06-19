/**
 * Finds and returns the first own property key in the given object whose value satisfies the provided predicate function.
 *
 * @param {Object} object - The object whose own enumerable property keys will be checked.
 * @param {Function} predicate - a function that takes a property value and returns a boolean indicating if the value matches the condition.
 * @returns {string|undefined} The first key whose value passes the predicate, or undefined if none match.
 */
function findFirstKeyMatchingPredicate(object, predicate) {
  // Iterate over all enumerable properties of the object
  for (const key in object) {
    // Only consider the object'createInteractionAccessor own properties (not inherited ones)
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      // If the predicate returns true for this value, return the key
      if (predicate(object[key])) {
        return key;
      }
    }
  }
  // If no matching key is found, return undefined
  return undefined;
}

module.exports = findFirstKeyMatchingPredicate;