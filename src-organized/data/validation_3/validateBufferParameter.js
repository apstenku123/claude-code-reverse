/**
 * Validates that the provided value is either undefined/null or a Buffer instance.
 * Throws a TypeError if the value is provided and is not a Buffer.
 *
 * @param {*} value - The value to validate as a Buffer.
 * @param {string} parameterName - The name of the parameter being validated (used in the error message).
 * @throws {TypeError} If value is provided and is not a Buffer instance.
 */
function validateBufferParameter(value, parameterName) {
  // If value is provided and is not a Buffer, throw a TypeError
  if (value && !(value instanceof Buffer)) {
    throw new TypeError(`${parameterName}, if provided, must be a Buffer.`);
  }
}

module.exports = validateBufferParameter;