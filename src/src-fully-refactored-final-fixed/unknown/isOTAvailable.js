/**
 * Checks if the external oT function returns a truthy value.
 *
 * @returns {boolean} True if oT() returns a truthy value, otherwise false.
 */
function isOTAvailable() {
  // Double negation (!!) coerces the result to a boolean
  return !!oT();
}

module.exports = isOTAvailable;