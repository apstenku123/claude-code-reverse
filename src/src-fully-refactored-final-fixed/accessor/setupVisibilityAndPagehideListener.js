/**
 * Sets up event listeners for 'visibilitychange' and 'pagehide' events on the document.
 * When the page is hidden or a 'pagehide' event occurs, the provided callback is invoked.
 * Optionally, the event listeners are removed after the first invocation if shouldRemoveAfterTrigger is true.
 *
 * @param {Function} handleVisibilityOrPageHide - Callback to execute when the page becomes hidden or is being unloaded.
 * @param {boolean} [shouldRemoveAfterTrigger=false] - If true, remove the event listeners after the first trigger.
 */
function setupVisibilityAndPagehideListener(handleVisibilityOrPageHide, shouldRemoveAfterTrigger = false) {
  /**
   * Internal event handler for both 'visibilitychange' and 'pagehide' events.
   * @param {Event} event - The event object from the listener.
   */
  const onVisibilityOrPageHide = (event) => {
    // Check if the event is 'pagehide' or the document is now hidden
    if (
      event.type === "pagehide" ||
      u7A.WINDOW.document.visibilityState === "hidden"
    ) {
      // Invoke the provided callback
      handleVisibilityOrPageHide(event);
      // Optionally remove listeners after the first trigger
      if (shouldRemoveAfterTrigger) {
        removeEventListener("visibilitychange", onVisibilityOrPageHide, true);
        removeEventListener("pagehide", onVisibilityOrPageHide, true);
      }
    }
  };

  // Ensure the document object exists before adding listeners
  if (u7A.WINDOW.document) {
    addEventListener("visibilitychange", onVisibilityOrPageHide, true);
    addEventListener("pagehide", onVisibilityOrPageHide, true);
  }
}

module.exports = setupVisibilityAndPagehideListener;