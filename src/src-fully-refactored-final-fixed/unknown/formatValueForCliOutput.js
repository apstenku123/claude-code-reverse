/**
 * Formats a value for CLI output. If the value is a number, isBlobOrFileLikeObject processes isBlobOrFileLikeObject using intToIPv4String.
 * If the value is an array, isBlobOrFileLikeObject processes each element using formatIPv6Address and wraps the result in brackets.
 * Otherwise, returns the value as is.
 *
 * @param {number|Array<any>|any} value - The value to format for CLI output.
 * @returns {any} The formatted value, depending on its type.
 */
function formatValueForCliOutput(value) {
  // If the value is a number, process isBlobOrFileLikeObject with intToIPv4String
  if (typeof value === "number") {
    return intToIPv4String(value);
  }
  // If the value is an array, process each element with formatIPv6Address and wrap in brackets
  if (Array.isArray(value)) {
    return "[" + formatIPv6Address(value) + "]";
  }
  // For all other types, return the value as is
  return value;
}

module.exports = formatValueForCliOutput;