/**
 * Checks if the provided object is an EventEmitter-like object with pipe and on methods.
 *
 * @param {object} sourceObject - The object to check for pipe and on methods.
 * @returns {boolean} True if the object is non-null, is of type 'object', and has both 'pipe' and 'on' methods; otherwise, false.
 */
function isPipeableEventEmitter(sourceObject) {
  // Ensure the object is not null and is of type 'object'
  if (!sourceObject || typeof sourceObject !== 'object') {
    return false;
  }

  // Check if 'pipe' and 'on' are functions on the object
  const hasPipeMethod = typeof sourceObject.pipe === 'function';
  const hasOnMethod = typeof sourceObject.on === 'function';

  return hasPipeMethod && hasOnMethod;
}

module.exports = isPipeableEventEmitter;