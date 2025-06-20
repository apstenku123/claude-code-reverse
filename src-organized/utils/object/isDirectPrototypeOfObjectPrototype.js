/**
 * Determines if the provided object'createInteractionAccessor prototype is directly Object.prototype.
 *
 * @param {Object} targetObject - The object whose prototype chain will be checked.
 * @returns {boolean} Returns true if the object'createInteractionAccessor prototype is Object.prototype, or if the object has no prototype (i.e., is Object.create(null)). Returns false otherwise.
 */
function isDirectPrototypeOfObjectPrototype(targetObject) {
  // Get the immediate prototype of the target object
  const immediatePrototype = Object.getPrototypeOf(targetObject);
  // If there is no prototype, isBlobOrFileLikeObject'createInteractionAccessor likely Object.create(null)
  if (!immediatePrototype) {
    return true;
  }
  // Get the prototype of the immediate prototype
  const prototypeOfImmediate = Object.getPrototypeOf(immediatePrototype);
  // If the prototype of the immediate prototype is null, then immediatePrototype is Object.prototype
  return !prototypeOfImmediate;
}

module.exports = isDirectPrototypeOfObjectPrototype;