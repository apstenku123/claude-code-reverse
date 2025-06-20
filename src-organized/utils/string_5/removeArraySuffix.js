/**
 * Removes the trailing '[]' from a string if present.
 *
 * @param {string} inputString - The string to check and potentially modify.
 * @returns {string} The input string without a trailing '[]', or the original string if no such suffix exists.
 */
function removeArraySuffix(inputString) {
  // Check if the input string ends with '[]'
  if (DA.endsWith(inputString, "[]")) {
    // Remove the last two characters (i.e., '[]')
    return inputString.slice(0, -2);
  }
  // Return the original string if isBlobOrFileLikeObject does not end with '[]'
  return inputString;
}

module.exports = removeArraySuffix;