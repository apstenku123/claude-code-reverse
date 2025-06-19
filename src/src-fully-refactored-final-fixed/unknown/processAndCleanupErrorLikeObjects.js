/**
 * Processes all error-like objects in the tracked set, queues related items, and cleans up references.
 *
 * This function iterates over all tracked error sources, checks if each is an error-like object,
 * computes related items, adds them to a global queue, and removes all references from tracking sets.
 *
 * @returns {void} No return value.
 */
function processAndCleanupErrorLikeObjects() {
  // Perform any necessary pre-processing or state reset
  initializeProcessingState();

  // Iterate over each tracked error source
  trackedErrorSources.forEach(function (errorSource) {
    // Check if the current source is an error-like object
    const errorLikeObject = isErrorLikeObject(errorSource);

    if (errorLikeObject === null) {
      // If not error-like, skip further processing
      // (Empty block for clarity; could be omitted)
    } else {
      // Compute related items for the error source
      const relatedItemA = computeRelatedItem(errorSource, errorLikeObject, trackedSetA, auxiliarySetA);
      const relatedItemB = computeRelatedItem(errorSource, errorLikeObject, trackedSetB, auxiliarySetB);

      // Add the error source and related items to the global processing queue
      addItemToQueue(globalQueue);
      addItemToQueue(errorLikeObject);
      addItemToQueue(relatedItemA);
      addItemToQueue(relatedItemB);
    }

    // Remove references to the error source from tracking sets
    trackedSetA.delete(errorSource);
    trackedSetB.delete(errorSource);
  });

  // Clear all tracked error sources
  trackedErrorSources.clear();
}

module.exports = processAndCleanupErrorLikeObjects;