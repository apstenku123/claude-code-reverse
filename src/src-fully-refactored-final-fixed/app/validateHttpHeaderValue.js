/**
 * Validates that the provided value is a legal HTTP header value.
 * Throws a TypeError if the value contains illegal characters as defined by the qa1 regular expression.
 *
 * @param {string} headerValue - The value to validate as an HTTP header value.
 * @throws {TypeError} If the value is not a legal HTTP header value.
 * @returns {void}
 */
function validateHttpHeaderValue(headerValue) {
  // Ensure the value is treated as a string
  const headerValueString = `${headerValue}`;
  // If the value contains illegal characters, throw an error
  if (qa1.test(headerValueString)) {
    throw new TypeError(`${headerValueString} is not a legal HTTP header value`);
  }
}

module.exports = validateHttpHeaderValue;