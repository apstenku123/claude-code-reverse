/**
 * Registers event listeners for 'visibilitychange' and 'pagehide' events on the document.
 * When either event occurs and the document is hidden, the provided handler is called.
 * Optionally, the event listeners can be removed after the first invocation.
 *
 * @param {Function} handleVisibilityOrPageHide - Callback to execute when the page is hidden or a pagehide event occurs.
 * @param {boolean} [removeListenersAfterInvoke=false] - If true, removes the event listeners after the first invocation.
 */
function registerPageHideAndVisibilityChangeHandler(handleVisibilityOrPageHide, removeListenersAfterInvoke = false) {
  /**
   * Internal event handler for both 'visibilitychange' and 'pagehide' events.
   * @param {Event} event - The triggered event object.
   */
  const onVisibilityOrPageHide = (event) => {
    const documentRef = u7A.WINDOW.document;
    // Check if the event is 'pagehide' or the document is now hidden
    if (
      event.type === 'pagehide' ||
      documentRef.visibilityState === 'hidden'
    ) {
      // Call the provided handler
      handleVisibilityOrPageHide(event);
      // If requested, remove the event listeners after first trigger
      if (removeListenersAfterInvoke) {
        removeEventListener('visibilitychange', onVisibilityOrPageHide, true);
        removeEventListener('pagehide', onVisibilityOrPageHide, true);
      }
    }
  };

  // Only register listeners if the document is available
  if (u7A.WINDOW.document) {
    addEventListener('visibilitychange', onVisibilityOrPageHide, true);
    addEventListener('pagehide', onVisibilityOrPageHide, true);
  }
}

module.exports = registerPageHideAndVisibilityChangeHandler;