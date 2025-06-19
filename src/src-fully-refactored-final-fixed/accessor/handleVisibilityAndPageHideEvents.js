/**
 * Registers event listeners for 'visibilitychange' and 'pagehide' events on the document.
 * When either event occurs, the provided callback is executed. Optionally, the listeners can be removed after the first trigger.
 *
 * @param {Function} onEventCallback - Callback function to execute when the event is triggered.
 * @param {boolean} removeAfterTrigger - If true, removes the event listeners after the first trigger.
 */
function handleVisibilityAndPageHideEvents(onEventCallback, removeAfterTrigger) {
  /**
   * Internal event handler for both 'visibilitychange' and 'pagehide' events.
   * @param {Event} event - The triggered event object.
   */
  const eventHandler = (event) => {
    const isPageHide = event.type === "pagehide";
    const isDocumentHidden = u7A.WINDOW.document.visibilityState === "hidden";

    // If the page is being hidden or the visibility state is 'hidden', trigger the callback
    if (isPageHide || isDocumentHidden) {
      onEventCallback(event);
      // If configured, remove the event listeners after the first trigger
      if (removeAfterTrigger) {
        removeEventListener("visibilitychange", eventHandler, true);
        removeEventListener("pagehide", eventHandler, true);
      }
    }
  };

  // Only add listeners if the document object exists
  if (u7A.WINDOW.document) {
    addEventListener("visibilitychange", eventHandler, true);
    addEventListener("pagehide", eventHandler, true);
  }
}

module.exports = handleVisibilityAndPageHideEvents;