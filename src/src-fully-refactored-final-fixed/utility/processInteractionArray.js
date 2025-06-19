/**
 * Processes an array of interaction entries if present, otherwise returns a default observable.
 *
 * @param {Array} interactionEntries - The array of interaction entries to process.
 * @returns {Observable} Returns the result of processing the interaction entries, or the default observable if the array is empty or not provided.
 */
function processInteractionArray(interactionEntries) {
  // If interactionEntries exists and is not empty, process isBlobOrFileLikeObject with findMatchingElementByAccessor
  // Otherwise, return the default observable
  return interactionEntries && interactionEntries.length
    ? findMatchingElementByAccessor(interactionEntries, routeNameMapper, interactionMetadataMapper)
    : defaultObservable;
}

module.exports = processInteractionArray;