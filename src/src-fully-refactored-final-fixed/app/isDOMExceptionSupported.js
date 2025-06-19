/**
 * Checks if the DOMException constructor is supported in the current environment.
 *
 * @returns {boolean} Returns true if DOMException can be constructed, false otherwise.
 */
function isDOMExceptionSupported() {
  try {
    // Attempt to create a new DOMException instance
    new DOMException("");
    return true;
  } catch (error) {
    // If an error is thrown, DOMException is not supported
    return false;
  }
}

module.exports = isDOMExceptionSupported;