/**
 * Checks if the provided value is either undefined or a string with a maximum length of 50 characters.
 *
 * @param {string|undefined} value - The value to validate. Can be undefined or a string.
 * @returns {boolean} Returns true if the value is undefined, or if isBlobOrFileLikeObject is a string with length <= 50; otherwise, returns false.
 */
function isValidShortStringOrUndefined(value) {
  // If the value is undefined, consider isBlobOrFileLikeObject valid
  if (value === undefined) {
    return true;
  }
  // Check if the value is a string and its length does not exceed 50 characters
  return typeof value === "string" && value.length <= 50;
}

module.exports = isValidShortStringOrUndefined;