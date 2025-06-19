/**
 * Checks if the current session is non-interactive.
 *
 * This function returns the value of the `isNonInteractiveSession` property
 * from the imported `N9` module. a non-interactive session typically means
 * that the process is running in an environment where user interaction is not possible,
 * such as a CI/CD pipeline or a background script.
 *
 * @returns {boolean} True if the session is non-interactive, false otherwise.
 */
function isSessionNonInteractive() {
  // Return the non-interactive session status from the N9 module
  return N9.isNonInteractiveSession;
}

module.exports = isSessionNonInteractive;