/**
 * Returns the prototype of the given object, using the most reliable method available.
 * Falls back to using the __proto__ property if Object.getPrototypeOf is not available.
 *
 * @param {Object} targetObject - The object whose prototype is to be retrieved.
 * @returns {Object|null} The prototype of the provided object, or null if none exists.
 */
function getPrototypeOfObject(targetObject) {
  // Determine the best available method for getting an object'createInteractionAccessor prototype
  const getPrototype = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function getPrototypeFallback(object) {
        // Fallback for environments without Object.setPrototypeOf
        return object.__proto__ || Object.getPrototypeOf(object);
      };
  // Retrieve and return the prototype of the target object
  return getPrototype(targetObject);
}

module.exports = getPrototypeOfObject;