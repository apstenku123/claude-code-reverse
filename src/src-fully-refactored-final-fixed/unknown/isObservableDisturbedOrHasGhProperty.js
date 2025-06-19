/**
 * Checks if the provided observable-like object is either disturbed or has the Gh property set.
 *
 * @param {object} sourceObservable - The observable or observable-like object to check.
 * @returns {boolean} True if the object is disturbed or has the Gh property; otherwise, false.
 */
function isObservableDisturbedOrHasGhProperty(sourceObservable) {
  // Ensure the object exists before checking its properties
  if (!sourceObservable) {
    return false;
  }

  // Check if the observable is disturbed using yD1.isDisturbed
  // or if isBlobOrFileLikeObject has the Gh property set (truthy)
  const isDisturbed = yD1.isDisturbed(sourceObservable);
  const hasGhProperty = Boolean(sourceObservable[Gh]);

  return isDisturbed || hasGhProperty;
}

module.exports = isObservableDisturbedOrHasGhProperty;