/**
 * Checks if the given observable is in the CLOSED state.
 *
 * @param {Object} observable - The observable object to check.
 * @returns {boolean} True if the observable is closed, false otherwise.
 */
function isObservableClosed(observable) {
  // 'ur' is assumed to be the property key for the observable'createInteractionAccessor state
  // 'pr.CLOSED' is assumed to be the constant representing the closed state
  return observable[ur] === pr.CLOSED;
}

module.exports = isObservableClosed;