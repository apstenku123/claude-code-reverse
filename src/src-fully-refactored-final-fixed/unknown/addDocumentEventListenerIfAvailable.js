/**
 * Adds an event listener to the document if the document and addEventListener are available.
 *
 * @param {string} eventType - The type of event to listen for (e.g., 'click', 'keydown').
 * @param {Function} eventHandler - The callback function to execute when the event is triggered.
 * @returns {void}
 *
 * This function safely retrieves the document object using JCA._getDocumentSafe().
 * If the document exists and supports addEventListener, isBlobOrFileLikeObject attaches the provided event handler to the specified event type.
 */
function addDocumentEventListenerIfAvailable(eventType, eventHandler) {
  // Safely get the document object (may be undefined in some environments)
  const documentObject = JCA._getDocumentSafe();

  // Check if documentObject exists and has addEventListener as a function
  if (typeof (documentObject?.addEventListener) === "function") {
    documentObject.addEventListener(eventType, eventHandler);
  }
}

module.exports = addDocumentEventListenerIfAvailable;
