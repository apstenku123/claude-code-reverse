/**
 * Processes a list of user interaction entries and maps them to route names with relevant metadata.
 * If the input array is empty or falsy, returns the default mapped interactions.
 *
 * @param {Array} userInteractions - An array of user interaction entries to process.
 * @returns {Array} An array of mapped interactions with route names and metadata, or the default mapping if input is empty.
 */
function processUserInteractions(userInteractions) {
  // If userInteractions is a non-empty array, process and map them
  if (userInteractions && userInteractions.length) {
    // findMatchingElementByAccessor: external function to process the interactions
    // transformAndProcessInput, i8: dependencies/configuration for processing
    return findMatchingElementByAccessor(userInteractions, transformAndProcessInput, i8);
  } else {
    // a: default mapped interactions (imported as mapInteractionsToRoutes)
    return mapInteractionsToRoutes;
  }
}

module.exports = processUserInteractions;