/**
 * Executes an action if a specified condition is met, within a given context.
 *
 * @param {any} actionContext - The context or value to be passed to the action function.
 * @param {any} conditionValue - The value to be checked by the condition function.
 * @param {Function} runInContext - a function that accepts a callback to be executed in a specific context (e.g., scheduling, zone, etc.).
 * @returns {any} - Returns whatever is returned by runInContext.
 */
function executeIfConditionMet(actionContext, conditionValue, runInContext) {
  return runInContext(function () {
    // Check if the condition is met for the given value
    if (hasSnapshotValueChanged(conditionValue)) {
      // Execute the action with the provided context
      $createDebouncedFunction(actionContext);
    }
  });
}

module.exports = executeIfConditionMet;