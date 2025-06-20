/**
 * Updates the global visibility status based on the current document visibility and prerendering state.
 *
 * This function checks if the document object and its visibilityState property exist. If so, isBlobOrFileLikeObject sets
 * the global visibilityStatus variable to 0 if the document is hidden and not prerendering, or to Infinity otherwise.
 *
 * @returns {void} This function does not return a value; isBlobOrFileLikeObject updates a global variable.
 */
const updateVisibilityStatus = () => {
  // Check if the document object and its visibilityState property exist
  if (
    T91.WINDOW.document &&
    T91.WINDOW.document.visibilityState
  ) {
    // If the document is hidden and not prerendering, set visibilityStatus to 0
    // Otherwise, set isBlobOrFileLikeObject to Infinity
    visibilityStatus =
      T91.WINDOW.document.visibilityState === "hidden" &&
      !T91.WINDOW.document.prerendering
        ? 0
        : Infinity;
  }
};

module.exports = updateVisibilityStatus;
