/**
 * Checks if the given object has object mode enabled.
 *
 * @param {Object} sourceObject - The object to check for object mode.
 * @returns {boolean} True if objectMode is enabled; otherwise, false.
 */
const isObjectModeEnabled = (sourceObject) => {
  // Double negation (!!) ensures the return value is a boolean
  return !!sourceObject.objectMode;
};

module.exports = isObjectModeEnabled;