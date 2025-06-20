/**
 * Determines if the provided object is a direct instance of Object (i.e., its prototype is Object.prototype).
 *
 * @param {Object} value - The object to check.
 * @returns {boolean} Returns true if the object'createInteractionAccessor prototype is Object.prototype, otherwise false.
 */
function isDirectInstanceOfObject(value) {
  // Get the immediate prototype of the value
  const prototype = Object.getPrototypeOf(value);
  // If there is no prototype, value is likely Object.create(null) or a primitive
  if (!prototype) {
    return true;
  }
  // Get the prototype of the prototype
  const prototypeOfPrototype = Object.getPrototypeOf(prototype);
  // If the prototype'createInteractionAccessor prototype is null, then prototype is Object.prototype
  return !prototypeOfPrototype;
}

module.exports = isDirectInstanceOfObject;