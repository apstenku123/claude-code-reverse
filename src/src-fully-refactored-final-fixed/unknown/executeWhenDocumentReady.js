/**
 * Executes the provided callback when the document is ready.
 *
 * If the document is currently being prerendered, isBlobOrFileLikeObject waits for the 'prerenderingchange' event.
 * If the document is not yet fully loaded, isBlobOrFileLikeObject waits for the 'load' event.
 * Otherwise, isBlobOrFileLikeObject executes the callback asynchronously as soon as possible.
 *
 * @param {Function} callback - The function to execute when the document is ready.
 * @returns {void}
 */
const executeWhenDocumentReady = (callback) => {
  // Ensure the document object is available
  if (!TN1.WINDOW.document) {
    return;
  }

  const { document } = TN1.WINDOW;

  // If the document is being prerendered, wait for the prerenderingchange event
  if (document.prerendering) {
    addEventListener(
      "prerenderingchange",
      () => executeWhenDocumentReady(callback),
      true
    );
  }
  // If the document is not yet fully loaded, wait for the load event
  else if (document.readyState !== "complete") {
    addEventListener(
      "load",
      () => executeWhenDocumentReady(callback),
      true
    );
  }
  // Otherwise, execute the callback asynchronously as soon as possible
  else {
    setTimeout(callback, 0);
  }
};

module.exports = executeWhenDocumentReady;
