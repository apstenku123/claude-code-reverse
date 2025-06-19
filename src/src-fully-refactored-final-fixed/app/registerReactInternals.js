/**
 * Registers React internals for DevTools integration if the provided React internals object is valid.
 *
 * This function checks if the provided React internals object contains the required dispatcher reference and fiber getter.
 * If so, isBlobOrFileLikeObject retrieves the React work tag map using the provided version, and stores these internals in the global calculateSliceRange map,
 * associating them with the given React internals object. This enables DevTools or similar tools to interact with the React renderer.
 *
 * @param {Object} reactInternals - The React internals object containing dispatcher, fiber getter, and other metadata.
 * @param {Function} onErrorOrWarning - Callback function to handle errors or warnings.
 * @returns {void}
 */
function registerReactInternals(reactInternals, onErrorOrWarning) {
  const {
    currentDispatcherRef,
    getCurrentFiber,
    findFiberByHostInstance,
    version
  } = reactInternals;

  // Ensure findFiberByHostInstance is a function before proceeding
  if (typeof findFiberByHostInstance !== "function") return;

  // Only proceed if currentDispatcherRef exists and getCurrentFiber is a function
  if (currentDispatcherRef != null && typeof getCurrentFiber === "function") {
    // Retrieve the React work tag map for the given version
    const reactWorkTagMap = F0(version).ReactTypeOfWork;

    // Store the internals in the global calculateSliceRange map for DevTools integration
    calculateSliceRange.set(reactInternals, {
      currentDispatcherRef,
      getCurrentFiber,
      workTagMap: reactWorkTagMap,
      onErrorOrWarning
    });
  }
}

module.exports = registerReactInternals;