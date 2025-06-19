/**
 * Checks if the Q15 condition is true and if the Fetch API is available in the current window context.
 *
 * @returns {boolean} Returns true if Q15() returns true and window.fetch is defined, otherwise false.
 */
function isFetchAvailableAndQ15True() {
  // Check if the Q15 condition is met
  const isQ15ConditionTrue = Q15();
  // Check if the Fetch API is available in the window object
  const isFetchAvailable = typeof window.fetch !== 'undefined';
  // Return true only if both conditions are true
  return isQ15ConditionTrue && isFetchAvailable;
}

module.exports = isFetchAvailableAndQ15True;