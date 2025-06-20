/**
 * Determines if the provided object is directly derived from Object.prototype.
 *
 * This utility checks if the given object'createInteractionAccessor prototype chain consists of exactly two levels:
 * - The object itself
 * - Its immediate prototype (should be Object.prototype)
 * - No further prototype (i.e., its prototype'createInteractionAccessor prototype is null)
 *
 * @param {Object} targetObject - The object to check.
 * @returns {boolean} Returns true if the object'createInteractionAccessor prototype chain ends at Object.prototype, false otherwise.
 */
function isDirectPrototypeOfObject(targetObject) {
  // Get the immediate prototype of the target object
  const immediatePrototype = Object.getPrototypeOf(targetObject);
  // If there is no prototype, this is likely Object.create(null) or a primitive
  if (!immediatePrototype) {
    return true;
  }
  // Get the prototype of the immediate prototype
  const parentPrototype = Object.getPrototypeOf(immediatePrototype);
  // If the parent prototype is null, then immediatePrototype is Object.prototype
  return !parentPrototype;
}

module.exports = isDirectPrototypeOfObject;