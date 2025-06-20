/**
 * Sets the non-interactive session flag for the N9 module.
 *
 * This function updates the 'isNonInteractiveSession' property on the N9 object,
 * which is used to indicate whether the current session is non-interactive.
 *
 * @param {boolean} isNonInteractiveSession - Indicates if the session is non-interactive (true) or interactive (false).
 * @returns {void} This function does not return a value.
 */
function setNonInteractiveSessionFlag(isNonInteractiveSession) {
  // Update the session type flag on the N9 module
  N9.isNonInteractiveSession = isNonInteractiveSession;
}

module.exports = setNonInteractiveSessionFlag;