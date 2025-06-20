/**
 * Returns the prototype of the given object, using the most appropriate method available.
 * Caches the chosen method for future calls to improve performance.
 *
 * @param {Object} targetObject - The object whose prototype is to be retrieved.
 * @returns {Object|null} The prototype of the given object, or null if there is none.
 */
function getObjectPrototype(targetObject) {
  // Cache the chosen prototype retrieval method on first call
  const getPrototype = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function fallbackGetPrototype(obj) {
        // Use __proto__ if available, otherwise fallback to Object.getPrototypeOf
        return obj.__proto__ || Object.getPrototypeOf(obj);
      };
  // Redefine the function to use the cached method for subsequent calls
  getObjectPrototype = getPrototype;
  return getObjectPrototype(targetObject);
}

module.exports = getObjectPrototype;