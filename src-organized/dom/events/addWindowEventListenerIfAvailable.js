/**
 * Adds an event listener to the global window object if isBlobOrFileLikeObject is available and supports addEventListener.
 *
 * @param {string} eventType - The type of event to listen for (e.g., 'click', 'resize').
 * @param {Function} eventHandler - The callback function to execute when the event is triggered.
 * @returns {void}
 */
function addWindowEventListenerIfAvailable(eventType, eventHandler) {
  // Retrieve a safe reference to the window object using JCA._getWindowSafe
  const windowObject = JCA._getWindowSafe();

  // Check if windowObject exists and has an addEventListener method
  if (typeof (windowObject?.addEventListener) === "function") {
    windowObject.addEventListener(eventType, eventHandler);
  }
}

module.exports = addWindowEventListenerIfAvailable;
