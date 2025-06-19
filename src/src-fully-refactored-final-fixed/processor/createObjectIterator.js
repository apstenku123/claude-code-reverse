/**
 * Creates an iterator function that traverses an object'createInteractionAccessor properties (either forward or backward),
 * invoking a callback for each property. Iteration can be stopped early by returning false from the callback.
 *
 * @param {boolean} iterateFromRight - If true, iterates from the last property to the first; otherwise, from first to last.
 * @returns {function(object: Object, callback: function, getKeys: function): Object} - The iterator function.
 */
function createObjectIterator(iterateFromRight) {
  /**
   * Iterates over the properties of the given object, invoking the callback for each property.
   *
   * @param {Object} targetObject - The object whose properties will be iterated over.
   * @param {function} callback - Function to invoke for each property. Receives (value, key, object).
   *                              If callback returns false, iteration stops early.
   * @param {function} getKeys - Function that returns an array of property keys to iterate over.
   * @returns {Object} The original targetObject.
   */
  return function (targetObject, callback, getKeys) {
    let currentIndex = -1;
    const objectReference = Object(targetObject);
    const propertyKeys = getKeys(targetObject);
    let remaining = propertyKeys.length;

    // Iterate over the property keys, either from right-to-left or left-to-right
    while (remaining--) {
      // Choose the next property index based on iteration direction
      const propertyKey = propertyKeys[iterateFromRight ? remaining : ++currentIndex];
      // If callback returns false, stop iteration early
      if (callback(objectReference[propertyKey], propertyKey, objectReference) === false) {
        break;
      }
    }
    return targetObject;
  };
}

module.exports = createObjectIterator;