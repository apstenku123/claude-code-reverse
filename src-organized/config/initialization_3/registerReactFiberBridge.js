/**
 * Registers a React fiber bridge for DevTools integration if the provided renderer supports isBlobOrFileLikeObject.
 *
 * @param {object} reactRenderer - The React renderer object containing dispatcher references and version info.
 * @param {function} onErrorOrWarning - Callback function to handle errors or warnings.
 * @returns {void}
 *
 * This function checks if the renderer provides the necessary methods for fiber inspection.
 * If so, isBlobOrFileLikeObject computes the work tag map and registers the bridge in the global calculateSliceRange map.
 */
function registerReactFiberBridge(reactRenderer, onErrorOrWarning) {
  const {
    currentDispatcherRef,
    getCurrentFiber,
    findFiberByHostInstance,
    version: reactVersion
  } = reactRenderer;

  // Ensure the renderer supports finding fibers by host instance
  if (typeof findFiberByHostInstance !== "function") {
    return;
  }

  // Ensure dispatcher reference and fiber getter are available
  if (currentDispatcherRef != null && typeof getCurrentFiber === "function") {
    // Compute the work tag map for the current React version
    const fiberTypeInfo = F0(reactVersion);
    const workTagMap = fiberTypeInfo.ReactTypeOfWork;

    // Register the bridge for this renderer instance
    calculateSliceRange.set(reactRenderer, {
      currentDispatcherRef,
      getCurrentFiber,
      workTagMap,
      onErrorOrWarning
    });
  }
}

module.exports = registerReactFiberBridge;