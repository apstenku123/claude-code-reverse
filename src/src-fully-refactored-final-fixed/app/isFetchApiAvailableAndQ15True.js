/**
 * Checks if the Q15 condition is true and if the Fetch API is available in the current window context.
 *
 * @returns {boolean} Returns true if Q15() returns true and window.fetch is defined, otherwise false.
 */
function isFetchApiAvailableAndQ15True() {
  // Check if Q15 condition is met and Fetch API is supported by the browser
  return Q15() && typeof window.fetch === 'function';
}

module.exports = isFetchApiAvailableAndQ15True;