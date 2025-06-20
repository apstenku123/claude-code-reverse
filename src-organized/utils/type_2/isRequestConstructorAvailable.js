/**
 * Checks if the environment supports the Request constructor and that the vE1 prerequisite passes.
 *
 * @returns {boolean} Returns true if the Request constructor can be instantiated and vE1 returns true; otherwise, false.
 */
function isRequestConstructorAvailable() {
  // Check prerequisite condition before proceeding
  if (!vE1()) {
    return false;
  }

  try {
    // Attempt to instantiate a Request object to verify support
    new Request("_", {
      referrerPolicy: "origin"
    });
    return true;
  } catch (requireLanguageOrThrow) {
    // If instantiation fails, Request is not supported
    return false;
  }
}

module.exports = isRequestConstructorAvailable;