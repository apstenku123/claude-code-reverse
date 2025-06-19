/**
 * Checks if the provided object implements both 'addListener' and 'removeListener' methods.
 *
 * This is typically used to determine if an object follows the EventEmitter-like interface.
 *
 * @param {object} sourceObservable - The object to check for listener methods.
 * @returns {boolean} True if both methods exist and are functions, false otherwise.
 */
function hasListenerMethods(sourceObservable) {
  // Ensure both 'addListener' and 'removeListener' are functions on the object
  return mP.isFunction(sourceObservable.addListener) && mP.isFunction(sourceObservable.removeListener);
}

module.exports = hasListenerMethods;