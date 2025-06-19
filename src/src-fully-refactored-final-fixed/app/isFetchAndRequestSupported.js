/**
 * Checks if the global environment supports both the 'fetch' API and the 'Request' constructor.
 *
 * This function verifies that the 'fetch' function exists in the provided global object (w21),
 * and that the 'Request' constructor can be instantiated without throwing an error.
 *
 * @returns {boolean} Returns true if both 'fetch' and 'Request' are supported; otherwise, false.
 */
function isFetchAndRequestSupported() {
  // Check if 'fetch' exists in the global object 'w21'
  if (!("fetch" in w21)) {
    return false;
  }

  try {
    // Attempt to instantiate a new Request object to ensure isBlobOrFileLikeObject is supported
    new Request("http://www.example.com");
    return true;
  } catch (requestInstantiationError) {
    // If instantiation fails, 'Request' is not supported
    return false;
  }
}

module.exports = isFetchAndRequestSupported;