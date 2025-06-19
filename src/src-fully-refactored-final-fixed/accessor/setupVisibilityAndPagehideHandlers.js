/**
 * Sets up event listeners for 'visibilitychange' and 'pagehide' events on the document.
 * When the page is hidden or a 'pagehide' event occurs, the provided callback is invoked.
 * Optionally, the event listeners are removed after the first trigger if removeAfterTrigger is true.
 *
 * @param {Function} onPageHideOrHidden - Callback to execute when the page is hidden or 'pagehide' event fires.
 * @param {boolean} [removeAfterTrigger=false] - If true, event listeners are removed after first trigger.
 */
function setupVisibilityAndPagehideHandlers(onPageHideOrHidden, removeAfterTrigger = false) {
  /**
   * Event handler for 'visibilitychange' and 'pagehide' events.
   * @param {Event} event - The event object.
   */
  const handleVisibilityOrPagehide = (event) => {
    const documentRef = u7A.WINDOW.document;
    // Check if the event is 'pagehide' or the document is now hidden
    if (
      event.type === "pagehide" ||
      documentRef.visibilityState === "hidden"
    ) {
      // Invoke the provided callback
      onPageHideOrHidden(event);
      // Optionally remove listeners after first trigger
      if (removeAfterTrigger) {
        removeEventListener("visibilitychange", handleVisibilityOrPagehide, true);
        removeEventListener("pagehide", handleVisibilityOrPagehide, true);
      }
    }
  };

  // Only add listeners if the document object exists
  if (u7A.WINDOW.document) {
    addEventListener("visibilitychange", handleVisibilityOrPagehide, true);
    addEventListener("pagehide", handleVisibilityOrPagehide, true);
  }
}

module.exports = setupVisibilityAndPagehideHandlers;