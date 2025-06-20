/**
 * Checks if the result of the oT function is truthy.
 *
 * @returns {boolean} Returns true if oT() returns a truthy value, otherwise false.
 */
function isOTFunctionTruthy() {
  // Call the external oT function and coerce its result to a boolean
  return Boolean(oT());
}

module.exports = isOTFunctionTruthy;