/**
 * Returns the name of the constructor of the given object'createInteractionAccessor prototype.
 * If the object has a null prototype, returns the string "null prototype".
 *
 * @param {Object} targetObject - The object whose prototype'createInteractionAccessor constructor name is to be retrieved.
 * @returns {string} The name of the prototype'createInteractionAccessor constructor, or "null prototype" if the prototype is null.
 */
function getPrototypeConstructorName(targetObject) {
  // Get the prototype of the provided object
  const prototype = Object.getPrototypeOf(targetObject);
  // If prototype exists, return its constructor'createInteractionAccessor name; otherwise, indicate null prototype
  return prototype ? prototype.constructor.name : "null prototype";
}

module.exports = getPrototypeConstructorName;