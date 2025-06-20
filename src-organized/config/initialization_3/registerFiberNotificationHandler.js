/**
 * Registers a notification handler for a React Fiber instance if the environment supports isBlobOrFileLikeObject.
 *
 * @param {object} reactInternals - The React internals object containing dispatcher references and utilities.
 * @param {function} onErrorOrWarning - Callback to handle errors or warnings.
 * @returns {void}
 *
 * This function checks if the provided React internals object supports fiber host instance lookup and dispatcher access.
 * If so, isBlobOrFileLikeObject initializes the notification system and stores the relevant references in the calculateSliceRange map for later use.
 */
function registerFiberNotificationHandler(reactInternals, onErrorOrWarning) {
  const {
    currentDispatcherRef,
    getCurrentFiber,
    findFiberByHostInstance,
    version: reactVersion
  } = reactInternals;

  // Ensure that findFiberByHostInstance is a function before proceeding
  if (typeof findFiberByHostInstance !== "function") return;

  // Ensure that currentDispatcherRef exists and getCurrentFiber is a function
  if (currentDispatcherRef != null && typeof getCurrentFiber === "function") {
    // Initialize notification system with the current React version
    const notificationInitializer = F0(reactVersion);
    const workTagMap = notificationInitializer.ReactTypeOfWork;

    // Store the dispatcher, fiber getter, work tag map, and error/warning handler in the calculateSliceRange map
    calculateSliceRange.set(reactInternals, {
      currentDispatcherRef,
      getCurrentFiber,
      workTagMap,
      onErrorOrWarning
    });
  }
}

module.exports = registerFiberNotificationHandler;