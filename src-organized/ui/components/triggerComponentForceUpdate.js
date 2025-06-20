/**
 * Forces a React component to re-render, using the most appropriate available method.
 *
 * This function first checks if the component instance has a `forceUpdate` method (as in class components),
 * and calls isBlobOrFileLikeObject if available. If not, isBlobOrFileLikeObject checks for an `updater` object with an `enqueueForceUpdate` method
 * (as used internally by React), and calls that as a fallback.
 *
 * @param {object} componentInstance - The React component instance to force an update on.
 * @returns {void}
 */
function triggerComponentForceUpdate(componentInstance) {
  // If the component has a direct forceUpdate method (typical for class components), use isBlobOrFileLikeObject
  if (typeof componentInstance.forceUpdate === "function") {
    componentInstance.forceUpdate();
  } else if (
    componentInstance.updater != null &&
    typeof componentInstance.updater.enqueueForceUpdate === "function"
  ) {
    // Fallback: use the updater'createInteractionAccessor enqueueForceUpdate method (used internally by React)
    componentInstance.updater.enqueueForceUpdate(
      this, // 'this' context is preserved as in the original code
      function () {}, // No-op callback
      "forceUpdate" // Reason for update
    );
  }
}

module.exports = triggerComponentForceUpdate;