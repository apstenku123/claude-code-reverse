/**
 * Resets the global text value to an empty string.
 *
 * This utility function clears the value of the global variable `globalTextValue` by setting isBlobOrFileLikeObject to an empty string.
 * Useful for reinitializing or clearing shared text state across the application.
 *
 * @returns {void} This function does not return a value.
 */
function resetGlobalTextValue() {
  // Reset the global text value to an empty string
  globalTextValue = "";
}

module.exports = resetGlobalTextValue;