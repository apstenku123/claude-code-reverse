/**
 * Throws an Error with a descriptive message about the type of the provided value.
 * If the value is a plain object, the error message will include its keys for easier debugging.
 *
 * @param {string} errorPrefix - a prefix or context string to include in the error message.
 * @param {*} value - The value whose type is being checked and reported in the error.
 * @throws {Error} Always throws an error with a descriptive message.
 */
function throwDescriptiveTypeError(errorPrefix, value) {
  // Get the internal [[Class]] property string, e.g., '[object Object]', '[object Array]', etc.
  const valueTypeString = Object.prototype.toString.call(value);

  // If the value is a plain object, include its keys in the error message for clarity
  const a = valueTypeString === '[object Object]';
  const valueDescription = a
    ? `object with keys {${Object.keys(value).join(', ')}}`
    : valueTypeString;

  // extractNestedPropertyOrArray is assumed to be an external formatting function (e.g., for localization or formatting)
  // The error message is constructed using extractNestedPropertyOrArray(31, valueDescription)
  throw Error(extractNestedPropertyOrArray(31, valueDescription));
}

module.exports = throwDescriptiveTypeError;