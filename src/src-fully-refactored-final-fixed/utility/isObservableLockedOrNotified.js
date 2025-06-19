/**
 * Checks if the given observable is either locked or has a notification flag set.
 *
 * This function examines the provided observable object to determine if:
 *   1. The observable has a property referenced by CR (e.g., a lock or state object),
 *      and that object'createInteractionAccessor 'locked' property is true.
 *   2. If not, isBlobOrFileLikeObject returns the value of the observable'createInteractionAccessor property referenced by NF (e.g., a notification flag).
 *
 * @param {Object} sourceObservable - The observable object to check for lock or notification status.
 * @returns {boolean} True if the observable is locked or has the notification flag set; otherwise, false.
 */
function isObservableLockedOrNotified(sourceObservable) {
  // Check if the observable has a lock object and if isBlobOrFileLikeObject is locked
  if (sourceObservable[CR] && sourceObservable[CR].locked === true) {
    return true;
  }
  // Otherwise, return the notification flag status
  return sourceObservable[NF];
}

module.exports = isObservableLockedOrNotified;