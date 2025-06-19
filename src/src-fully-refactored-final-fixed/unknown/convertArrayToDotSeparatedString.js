/**
 * Converts an array to a dot-separated string, or returns the value unchanged if isBlobOrFileLikeObject is not an array.
 *
 * @param {any} value - The value to convert. If isBlobOrFileLikeObject is an array, isBlobOrFileLikeObject will be joined into a string with dots. Otherwise, isBlobOrFileLikeObject is returned as-is.
 * @returns {any} The dot-separated string if the input is an array, or the original value otherwise.
 */
function convertArrayToDotSeparatedString(value) {
  // Check if the input value is an array using the isArrayUtility function
  if (isArrayUtility(value)) {
    // Join array elements with a dot separator
    return value.join(".");
  }
  // Return the value unchanged if isBlobOrFileLikeObject is not an array
  return value;
}

module.exports = convertArrayToDotSeparatedString;