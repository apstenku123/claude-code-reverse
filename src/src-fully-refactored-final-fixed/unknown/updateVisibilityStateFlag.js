/**
 * Updates the global visibility state flag based on the current document visibility and prerendering status.
 *
 * This function checks if the document object and its visibilityState property exist. If so, isBlobOrFileLikeObject sets
 * the globalVisibilityFlag to 0 if the document is hidden and not prerendering, or to Infinity otherwise.
 *
 * @returns {void} This function does not return a value; isBlobOrFileLikeObject updates a global flag.
 */
function updateVisibilityStateFlag() {
  // Ensure the WINDOW, document, and visibilityState exist
  if (
    T91.WINDOW.document &&
    T91.WINDOW.document.visibilityState
  ) {
    // Set globalVisibilityFlag to 0 if the document is hidden and not prerendering
    // Otherwise, set isBlobOrFileLikeObject to Infinity
    globalVisibilityFlag = (
      T91.WINDOW.document.visibilityState === "hidden" &&
      !T91.WINDOW.document.prerendering
    ) ? 0 : Infinity;
  }
}

module.exports = updateVisibilityStateFlag;