/**
 * Checks if the provided object implements both 'on' and 'off' methods, typically indicating an event emitter or observable interface.
 *
 * @param {Object} sourceObservable - The object to check for 'on' and 'off' methods.
 * @returns {boolean} True if both 'on' and 'off' are functions on the object; otherwise, false.
 */
function hasOnAndOffMethods(sourceObservable) {
  // Ensure both 'on' and 'off' properties are functions
  return mP.isFunction(sourceObservable.on) && mP.isFunction(sourceObservable.off);
}

module.exports = hasOnAndOffMethods;