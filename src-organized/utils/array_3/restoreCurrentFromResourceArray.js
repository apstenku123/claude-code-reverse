/**
 * Restores the current value from the resource array if available.
 *
 * This function checks if there is a valid index in the resource array (resourceArrayIndex >= 0).
 * If so, isBlobOrFileLikeObject assigns the value at that index in the resource array to the 'current' property of the provided object,
 * then clears the resource array slot and decrements the index.
 *
 * @param {Object} targetObject - An object with a 'current' property to be restored from the resource array.
 * @returns {void}
 */
function restoreCurrentFromResourceArray(targetObject) {
  // Check if there is a valid resource to restore
  if (resourceArrayIndex >= 0) {
    // Restore the current value from the resource array
    targetObject.current = resourceArray[resourceArrayIndex];
    // Clear the resource array slot
    resourceArray[resourceArrayIndex] = null;
    // Move to the previous resource
    resourceArrayIndex--;
  }
}

module.exports = restoreCurrentFromResourceArray;