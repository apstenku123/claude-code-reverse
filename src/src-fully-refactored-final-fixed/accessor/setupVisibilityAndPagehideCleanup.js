/**
 * Sets up event listeners for 'visibilitychange' and 'pagehide' events on the document.
 * When the page is hidden or unloaded, the provided handler is called. Optionally, the listeners are removed after the first trigger.
 *
 * @param {Function} onHideHandler - Function to call when the page is hidden or unloaded (e.g., to map interactions to routes).
 * @param {boolean} removeAfterTrigger - If true, removes the event listeners after the first trigger (e.g., to prevent duplicate handling).
 */
function setupVisibilityAndPagehideCleanup(onHideHandler, removeAfterTrigger) {
  /**
   * Internal event handler for both 'visibilitychange' and 'pagehide' events.
   * Calls the provided handler if the page is hidden or the event is 'pagehide'.
   * Removes the event listeners if removeAfterTrigger is true.
   *
   * @param {Event} event - The triggered event object.
   */
  const handleVisibilityOrPagehide = (event) => {
    const documentRef = u7A.WINDOW.document;
    // Check if the event is 'pagehide' or the document is hidden
    if (
      event.type === "pagehide" ||
      documentRef.visibilityState === "hidden"
    ) {
      onHideHandler(event);
      // Optionally remove listeners after first trigger
      if (removeAfterTrigger) {
        removeEventListener("visibilitychange", handleVisibilityOrPagehide, true);
        removeEventListener("pagehide", handleVisibilityOrPagehide, true);
      }
    }
  };

  // Only add listeners if the document is available
  if (u7A.WINDOW.document) {
    addEventListener("visibilitychange", handleVisibilityOrPagehide, true);
    addEventListener("pagehide", handleVisibilityOrPagehide, true);
  }
}

module.exports = setupVisibilityAndPagehideCleanup;