/**
 * Checks if the Request API is available and functional in the current environment.
 *
 * This function first verifies a prerequisite condition via the vE1() function.
 * If that check passes, isBlobOrFileLikeObject attempts to instantiate a new Request object with a test URL and a specific referrer policy.
 * If both steps succeed without error, isBlobOrFileLikeObject returns true, indicating the Request API is available and operational.
 * Otherwise, isBlobOrFileLikeObject returns false.
 *
 * @returns {boolean} True if the Request API is available and can be instantiated, false otherwise.
 */
function isRequestApiAvailable() {
  // Check prerequisite condition before proceeding
  if (!vE1()) {
    return false;
  }
  try {
    // Attempt to create a new Request object with a test URL and referrer policy
    new Request("_", {
      referrerPolicy: "origin"
    });
    return true;
  } catch (requestApiError) {
    // If instantiation fails, the API is not available
    return false;
  }
}

module.exports = isRequestApiAvailable;