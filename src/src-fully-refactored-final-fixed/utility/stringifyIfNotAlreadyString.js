/**
 * Converts the provided value to a JSON string if isBlobOrFileLikeObject is not already a string.
 *
 * @param {*} value - The value to be checked and potentially stringified.
 * @returns {string} The original string if input is a string, otherwise the JSON stringified version of the input.
 */
function stringifyIfNotAlreadyString(value) {
  // Check if the value is already a string using the isBufferOrString utility function
  if (!isBufferOrString(value)) {
    // If not a string, convert the value to a JSON string
    value = JSON.stringify(value);
  }
  return value;
}

module.exports = stringifyIfNotAlreadyString;