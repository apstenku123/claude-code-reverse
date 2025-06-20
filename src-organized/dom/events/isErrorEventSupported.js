/**
 * Checks if the ErrorEvent constructor is supported in the current environment.
 *
 * @returns {boolean} Returns true if ErrorEvent can be constructed, otherwise false.
 */
function isErrorEventSupported() {
  try {
    // Attempt to create a new ErrorEvent instance
    new ErrorEvent("");
    return true;
  } catch (error) {
    // If an error is thrown, ErrorEvent is not supported
    return false;
  }
}

module.exports = isErrorEventSupported;