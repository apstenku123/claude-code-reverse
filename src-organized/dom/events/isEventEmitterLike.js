/**
 * Checks if the provided object behaves like an EventEmitter by verifying the presence of a callable 'once' method.
 *
 * @param {object} possibleEmitter - The object to check for EventEmitter-like behavior.
 * @returns {boolean} True if the object is non-null, is of type 'object', and has a 'once' method that is a function; otherwise, false.
 */
function isEventEmitterLike(possibleEmitter) {
  // Ensure the value is an object and not null
  if (!possibleEmitter || typeof possibleEmitter !== 'object') {
    return false;
  }

  // Check if the 'once' property exists and is a function
  return typeof possibleEmitter.once === 'function';
}

module.exports = isEventEmitterLike;