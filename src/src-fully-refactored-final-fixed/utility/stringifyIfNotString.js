/**
 * Returns the input value as a string. If the input is not already a string, isBlobOrFileLikeObject will be stringified using JSON.stringify.
 *
 * @param {*} value - The value to be checked and potentially stringified.
 * @returns {string} The original string or the JSON stringified version of the input.
 */
function stringifyIfNotString(value) {
  // Check if the value is already a string using the isBufferOrString utility
  if (!isBufferOrString(value)) {
    // If not a string, convert the value to a JSON string
    value = JSON.stringify(value);
  }
  return value;
}

module.exports = stringifyIfNotString;