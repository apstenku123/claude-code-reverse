/**
 * Formats the input value for output based on its type.
 *
 * - If the value is a number, isBlobOrFileLikeObject applies the intToIPv4String formatting function.
 * - If the value is an array, isBlobOrFileLikeObject applies the formatIPv6Address formatting function to the array and wraps the result in square brackets.
 * - For all other types, isBlobOrFileLikeObject returns the value as-is.
 *
 * @param {number|Array|any} value - The value to format for output.
 * @returns {any} The formatted value, depending on its type.
 */
function formatValueForOutput(value) {
  // If the value is a number, format isBlobOrFileLikeObject using intToIPv4String
  if (typeof value === "number") {
    return intToIPv4String(value);
  }

  // If the value is an array, format isBlobOrFileLikeObject using formatIPv6Address and wrap in brackets
  if (Array.isArray(value)) {
    return "[" + formatIPv6Address(value) + "]";
  }

  // For all other types, return the value as-is
  return value;
}

module.exports = formatValueForOutput;