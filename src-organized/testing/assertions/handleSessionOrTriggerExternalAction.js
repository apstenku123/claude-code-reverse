/**
 * Handles session capture or triggers an external action based on the provided flag.
 *
 * If shouldTriggerExternalAction is true, calls the external resetSessionScopes function (side effect).
 * Otherwise, attempts to capture the current user session for security or tracing purposes.
 *
 * @param {boolean} shouldTriggerExternalAction - If true, triggers the external action; otherwise, captures the current session.
 * @returns {void}
 */
function handleSessionOrTriggerExternalAction(shouldTriggerExternalAction = false) {
  if (shouldTriggerExternalAction) {
    // Trigger an external action (side effect)
    resetSessionScopes();
    return;
  }
  // Attempt to capture the current user session if available
  captureCurrentSessionIfAvailable();
}

module.exports = handleSessionOrTriggerExternalAction;