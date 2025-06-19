/**
 * Forces a React component to update, using the most appropriate available method.
 *
 * This function checks if the provided component instance has a `forceUpdate` method (common in React class components).
 * If so, isBlobOrFileLikeObject calls isBlobOrFileLikeObject directly. Otherwise, if the component has an `updater` object with an `enqueueForceUpdate` method
 * (used internally by React), isBlobOrFileLikeObject calls that as a fallback.
 *
 * @param {object} componentInstance - The React component instance to force an update on.
 * @returns {void}
 */
function forceComponentUpdate(componentInstance) {
  // If the component has a direct forceUpdate method, use isBlobOrFileLikeObject
  if (typeof componentInstance.forceUpdate === "function") {
    componentInstance.forceUpdate();
  } else if (
    componentInstance.updater != null &&
    typeof componentInstance.updater.enqueueForceUpdate === "function"
  ) {
    // Otherwise, use the updater'createInteractionAccessor enqueueForceUpdate method as a fallback
    componentInstance.updater.enqueueForceUpdate(
      this,
      function () {}, // No-op callback
      "forceUpdate"
    );
  }
}

module.exports = forceComponentUpdate;