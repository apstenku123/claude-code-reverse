/**
 * Determines whether a localStorage warning should be shown to the user.
 * The warning is shown if the environment does not support localStorage (O3 returns false),
 * or if there is at least one item stored in localStorage.
 *
 * @returns {boolean} True if the warning should be shown, false otherwise.
 */
function shouldShowLocalStorageWarning() {
  // O3() is assumed to check for localStorage support
  // Show warning if localStorage is not supported or if localStorage has any items
  return !isLocalStorageSupported() || localStorage.length > 0;
}

/**
 * Checks if localStorage is supported in the current environment.
 * This is a wrapper for the external O3 function.
 *
 * @returns {boolean} True if localStorage is supported, false otherwise.
 */
function isLocalStorageSupported() {
  // O3 is an external function that checks for localStorage support
  return O3();
}

module.exports = shouldShowLocalStorageWarning;