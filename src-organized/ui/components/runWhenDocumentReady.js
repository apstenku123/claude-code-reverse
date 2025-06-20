/**
 * Executes the provided callback when the document is fully ready.
 * If the document is prerendering, waits for 'prerenderingchange' event.
 * If the document is still loading, waits for the 'load' event.
 * Otherwise, executes the callback asynchronously as soon as possible.
 *
 * @param {Function} callback - The function to execute when the document is ready.
 * @returns {void}
 */
const runWhenDocumentReady = (callback) => {
  // Ensure the document object exists
  if (!TN1.WINDOW.document) return;

  const documentObject = TN1.WINDOW.document;

  // If the document is currently prerendering, wait for isBlobOrFileLikeObject to finish
  if (documentObject.prerendering) {
    addEventListener(
      "prerenderingchange",
      () => executeWhenDocumentReady(callback), // Re-invoke this function when prerendering ends
      true
    );
  }
  // If the document is not yet fully loaded, wait for the load event
  else if (documentObject.readyState !== "complete") {
    addEventListener(
      "load",
      () => executeWhenDocumentReady(callback), // Re-invoke this function when load completes
      true
    );
  }
  // If the document is ready, execute the callback asynchronously
  else {
    setTimeout(callback, 0);
  }
};

module.exports = runWhenDocumentReady;
