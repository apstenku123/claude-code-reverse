/**
 * Throws an Error with a detailed message about the type of the provided value.
 * If the value is a plain object, the error message will include its keys.
 *
 * @param {string} errorPrefix - a string to prefix the error message (typically an error code or context).
 * @param {*} value - The value whose type will be inspected and reported in the error message.
 * @throws {Error} Always throws an error with a detailed message about the value'createInteractionAccessor type.
 */
function throwDetailedTypeError(errorPrefix, value) {
  // Get the internal [[Class]] of the value as a string, e.g., '[object Object]'
  const valueTypeString = Object.prototype.toString.call(value);

  // If the value is a plain object, include its keys in the error message
  const detailedTypeDescription = valueTypeString === '[object Object]'
    ? `object with keys {${Object.keys(value).join(', ')}}`
    : valueTypeString;

  // extractNestedPropertyOrArray is assumed to be an external function that formats the error message
  // Throw an error with the formatted message
  throw Error(extractNestedPropertyOrArray(31, detailedTypeDescription));
}

module.exports = throwDetailedTypeError;