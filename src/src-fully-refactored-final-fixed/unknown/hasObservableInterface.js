/**
 * Checks if the provided object implements the observable interface by verifying
 * the presence of 'on' and 'off' methods.
 *
 * @param {Object} sourceObservable - The object to check for observable methods.
 * @returns {boolean} True if both 'on' and 'off' methods are functions, otherwise false.
 */
function hasObservableInterface(sourceObservable) {
  // Ensure both 'on' and 'off' are functions on the object
  return mP.isFunction(sourceObservable.on) && mP.isFunction(sourceObservable.off);
}

module.exports = hasObservableInterface;