/**
 * Checks if the given observable is either disturbed or has a specific internal flag set.
 *
 * @param {Object} sourceObservable - The observable object to check.
 * @returns {boolean} True if the observable is disturbed or flagged; otherwise, false.
 */
function isObservableDisturbedOrFlagged(sourceObservable) {
  // Ensure the observable exists before checking its state or flags
  if (!sourceObservable) {
    return false;
  }

  // Check if the observable is disturbed using the external yD1 utility
  const isDisturbed = yD1.isDisturbed(sourceObservable);

  // Check if the observable has the internal flag property (Gh)
  const hasInternalFlag = Boolean(sourceObservable[Gh]);

  // Return true if either condition is met
  return isDisturbed || hasInternalFlag;
}

module.exports = isObservableDisturbedOrFlagged;