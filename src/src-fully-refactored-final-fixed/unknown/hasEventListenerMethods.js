/**
 * Checks if the provided object implements both addEventListener and removeEventListener methods.
 * This is typically used to determine if an object behaves like an EventTarget.
 *
 * @param {object} targetObject - The object to check for event listener methods.
 * @returns {boolean} True if both methods exist and are functions, false otherwise.
 */
function hasEventListenerMethods(targetObject) {
  // Ensure both addEventListener and removeEventListener are functions on the object
  return mP.isFunction(targetObject.addEventListener) && mP.isFunction(targetObject.removeEventListener);
}

module.exports = hasEventListenerMethods;