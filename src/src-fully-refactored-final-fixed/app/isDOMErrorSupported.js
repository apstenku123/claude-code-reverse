/**
 * Checks if the DOMError constructor is supported in the current environment.
 *
 * @returns {boolean} Returns true if DOMError can be instantiated, false otherwise.
 */
function isDOMErrorSupported() {
  try {
    // Attempt to create a new DOMError instance
    new DOMError("");
    return true;
  } catch (error) {
    // If an error is thrown, DOMError is not supported
    return false;
  }
}

module.exports = isDOMErrorSupported;