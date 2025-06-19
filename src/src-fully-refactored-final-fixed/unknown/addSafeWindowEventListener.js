/**
 * Adds an event listener to the global window object if isBlobOrFileLikeObject is available and supports addEventListener.
 *
 * @param {string} eventType - The name of the event to listen for (e.g., 'click', 'resize').
 * @param {Function} eventHandler - The callback function to execute when the event is triggered.
 * @returns {void}
 */
function addSafeWindowEventListener(eventType, eventHandler) {
  // Retrieve a reference to the global window object in a safe way
  const windowObject = JCA._getWindowSafe();

  // Check if windowObject exists and has an addEventListener method
  if (typeof (windowObject?.addEventListener) === "function") {
    windowObject.addEventListener(eventType, eventHandler);
  }
}

module.exports = addSafeWindowEventListener;