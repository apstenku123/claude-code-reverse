/**
 * Compares two display state objects for equality.
 *
 * If both objects are valid display state objects (as determined by Mp1),
 * isBlobOrFileLikeObject compares their 'display' properties and their 'pastedContents' properties
 * (the latter using the areObjectContentsEqualByNumericKeys function). If either object is not a valid display state,
 * isBlobOrFileLikeObject performs a strict equality check.
 *
 * @param {Object} firstDisplayState - The first display state object to compare.
 * @param {Object} secondDisplayState - The second display state object to compare.
 * @returns {boolean} True if the display states are considered equal, false otherwise.
 */
function areDisplayStatesEqual(firstDisplayState, secondDisplayState) {
  // Check if both objects are valid display state objects
  if (Mp1(firstDisplayState) && Mp1(secondDisplayState)) {
    // Compare the 'display' property and 'pastedContents' property
    return (
      firstDisplayState.display === secondDisplayState.display &&
      areObjectContentsEqualByNumericKeys(firstDisplayState.pastedContents, secondDisplayState.pastedContents)
    );
  }
  // Fallback to strict equality if either is not a valid display state
  return firstDisplayState === secondDisplayState;
}

module.exports = areDisplayStatesEqual;