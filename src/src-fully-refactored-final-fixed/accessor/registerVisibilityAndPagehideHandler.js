/**
 * Registers event listeners for 'visibilitychange' and 'pagehide' events on the document.
 * When the page becomes hidden or is about to be unloaded, the provided handler is invoked.
 * Optionally, the event listeners can be removed after the first trigger.
 *
 * @param {Function} onHideCallback - Callback to execute when the page is hidden or about to be unloaded.
 * @param {boolean} removeAfterTrigger - If true, removes the event listeners after the first invocation.
 */
function registerVisibilityAndPagehideHandler(onHideCallback, removeAfterTrigger) {
  /**
   * Handles visibility and pagehide events.
   *
   * @param {Event} event - The triggered event object.
   */
  const handleVisibilityOrPagehide = (event) => {
    // Check if the event is 'pagehide' or if the document is now hidden
    if (
      event.type === "pagehide" ||
      u7A.WINDOW.document.visibilityState === "hidden"
    ) {
      // Invoke the provided callback
      onHideCallback(event);
      // If requested, remove the event listeners after the first trigger
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

module.exports = registerVisibilityAndPagehideHandler;