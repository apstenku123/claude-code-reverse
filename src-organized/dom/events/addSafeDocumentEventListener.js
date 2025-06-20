/**
 * Adds an event listener to the document object if isBlobOrFileLikeObject is available and supports addEventListener.
 *
 * @param {string} eventType - The type of the event to listen for (e.g., 'click', 'keydown').
 * @param {EventListenerOrEventListenerObject} eventHandler - The callback function or object that receives a notification when an event of the specified type occurs.
 * @returns {void}
 */
function addSafeDocumentEventListener(eventType, eventHandler) {
  // Retrieve the document object safely using the JCA utility
  const documentObject = JCA._getDocumentSafe();
  // Check if the document object exists and supports addEventListener
  if (typeof (documentObject?.addEventListener) === "function") {
    documentObject.addEventListener(eventType, eventHandler);
  }
}

module.exports = addSafeDocumentEventListener;