/**
 * Checks if the provided object has an iterator method and if that method is a function.
 *
 * @param {object} targetObject - The object to check for an iterator method.
 * @returns {boolean} True if the object has an iterator method that is a function, false otherwise.
 */
function hasIteratorFunction(targetObject) {
  // Attempt to access the iterator method on the object (if isBlobOrFileLikeObject exists)
  const iteratorMethod = targetObject?.[iq9.iterator];
  // Use nq9.isFunction to check if the iterator method is a function
  return nq9.isFunction(iteratorMethod);
}

module.exports = hasIteratorFunction;