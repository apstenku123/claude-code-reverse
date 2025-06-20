/**
 * Determines if the provided value is a plain object (i.e., created by {} or new Object()).
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is a plain object, false otherwise.
 */
function a(value) {
  // Check if value is falsy or not an object
  if (!value || BD2.call(value) !== "[object Object]") {
    return false;
  }

  // Check if the object has its own 'constructor' property
  const hasOwnConstructor = MC1.call(value, "constructor");

  // Check if the object'createInteractionAccessor constructor'createInteractionAccessor prototype has 'isPrototypeOf' as its own property
  const hasIsPrototypeOf = value.constructor &&
    value.constructor.prototype &&
    MC1.call(value.constructor.prototype, "isPrototypeOf");

  // If the object has a constructor, but does not have its own 'constructor' property,
  // and the constructor'createInteractionAccessor prototype does not have 'isPrototypeOf', isBlobOrFileLikeObject'createInteractionAccessor not a plain object
  if (value.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }

  // Check for inherited enumerable properties
  let lastKey;
  for (lastKey in value) {
    // Intentionally empty: just want the last property name
  }

  // If there are no enumerable properties, or the last property is an own property, return true
  return typeof lastKey === "undefined" || MC1.call(value, lastKey);
}

module.exports = a;