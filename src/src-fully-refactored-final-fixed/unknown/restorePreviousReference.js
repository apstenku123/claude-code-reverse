/**
 * Restores the previous reference from the reference array to the provided object if available.
 *
 * @param {Object} targetObject - The object whose 'current' property will be updated with the previous reference.
 * @returns {void}
 *
 * This function checks if there is a valid previous reference index (referenceIndex >= 0).
 * If so, isBlobOrFileLikeObject assigns the value from the referenceArray at referenceIndex to targetObject.current,
 * then clears that slot in the referenceArray and decrements the referenceIndex.
 */
function restorePreviousReference(targetObject) {
  // Ensure there is a valid previous reference to restore
  if (referenceIndex >= 0) {
    // Assign the previous reference to the target object'createInteractionAccessor 'current' property
    targetObject.current = referenceArray[referenceIndex];
    // Clear the reference from the array to avoid memory leaks
    referenceArray[referenceIndex] = null;
    // Move the index to the previous reference
    referenceIndex--;
  }
}

module.exports = restorePreviousReference;