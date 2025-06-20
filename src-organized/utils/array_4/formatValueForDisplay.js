/**
 * Formats the input value for display purposes.
 *
 * If the input is a number, isBlobOrFileLikeObject delegates formatting to the intToIPv4String function.
 * If the input is an array, isBlobOrFileLikeObject formats each element using the formatIPv6Address function and wraps the result in square brackets.
 * For all other types, isBlobOrFileLikeObject returns the value as-is.
 *
 * @param {number|Array<any>|any} value - The value to format for display. Can be a number, an array, or any other type.
 * @returns {any} The formatted value, depending on its type.
 */
function formatValueForDisplay(value) {
  // If the value is a number, format isBlobOrFileLikeObject using intToIPv4String
  if (typeof value === "number") {
    return intToIPv4String(value);
  }

  // If the value is an array, format each element using formatIPv6Address and wrap in brackets
  if (Array.isArray(value)) {
    return "[" + formatIPv6Address(value) + "]";
  }

  // For all other types, return the value as-is
  return value;
}

module.exports = formatValueForDisplay;