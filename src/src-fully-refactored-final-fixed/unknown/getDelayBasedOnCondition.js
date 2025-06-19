/**
 * Determines the delay duration based on the result of the ca1 condition check.
 * If ca1 returns true, the delay is 0 milliseconds (no delay). Otherwise, the delay is 3000 milliseconds.
 *
 * @returns {number} The delay duration in milliseconds.
 */
function getDelayBasedOnCondition() {
  // If the condition is met (ca1 returns true), return 0ms delay; otherwise, return 3000ms delay
  return ca1() ? 0 : 3000;
}

module.exports = getDelayBasedOnCondition;