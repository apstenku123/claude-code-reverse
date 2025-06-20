/**
 * Checks if the maximum interaction is currently active.
 *
 * This accessor first verifies that the interaction system is enabled via `isInteractionSystemEnabled`.
 * If enabled, isBlobOrFileLikeObject retrieves the current interaction entry using `getCurrentInteractionEntry`.
 * It then returns the `isMax` property of the entry if isBlobOrFileLikeObject exists, otherwise defaults to `true`.
 *
 * @returns {boolean} Returns `true` if the maximum interaction is active, or if the property is not defined. Returns `false` if the interaction system is disabled or no entry is found.
 */
function isMaxInteractionActive() {
  // Check if the interaction system is enabled
  if (!isInteractionSystemEnabled()) return false;

  // Retrieve the current interaction entry
  const currentInteractionEntry = getCurrentInteractionEntry();
  if (!currentInteractionEntry) return false;

  // Return the 'isMax' property if isBlobOrFileLikeObject exists, otherwise default to true
  return currentInteractionEntry?.isMax ?? true;
}

module.exports = isMaxInteractionActive;