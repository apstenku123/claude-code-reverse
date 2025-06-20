/**
 * Determines if the provided class handle configuration is valid.
 *
 * Calls createClassHandle with the given className and pointerConfig, and returns true if the result equals 1.
 *
 * @param {string} className - The name of the class to validate. Defaults to an empty string if not provided.
 * @param {string} pointerConfig - The pointer configuration string. Defaults to an empty string if not provided.
 * @returns {boolean} True if the class handle is valid (i.e., createClassHandle returns 1), otherwise false.
 */
function isValidClassHandle(className = "", pointerConfig = "") {
  // Call createClassHandle and check if the result is exactly 1
  return createClassHandle(className, pointerConfig) === 1;
}

module.exports = isValidClassHandle;