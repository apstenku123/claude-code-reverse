/**
 * Updates the global variable `nextAllowedExecutionTime` to the current timestamp plus 500 milliseconds.
 * This is typically used to throttle or debounce actions by setting the next time an action is permitted.
 *
 * Depends on the global variable `nextAllowedExecutionTime` and the function `getCurrentTimestamp` (formerly `handleCharacterCode`).
 *
 * @returns {void} Does not return a value; updates a global variable.
 */
function updateNextAllowedExecutionTime() {
  // Set the next allowed execution time to now + 500ms
  nextAllowedExecutionTime = getCurrentTimestamp() + 500;
}

module.exports = updateNextAllowedExecutionTime;