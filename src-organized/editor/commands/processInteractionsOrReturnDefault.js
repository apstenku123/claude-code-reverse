/**
 * Processes a list of user interactions and maps them to routes, or returns a default mapping if the list is empty or undefined.
 *
 * @param {Array} interactionEntries - Array of user interaction entries to process.
 * @returns {Array} - Returns the mapped routes array if interactionEntries is valid and non-empty; otherwise, returns the default mapped routes.
 */
function processInteractionsOrReturnDefault(interactionEntries) {
  // If interactionEntries is valid and has at least one entry, process them
  if (interactionEntries && interactionEntries.length) {
    // findMatchingElementByAccessor: Processes the entries using mapping and filtering functions
    // transformAndProcessInput: Mapping function for interaction entries to routes
    // i8: Filtering or transformation function for entries
    return findMatchingElementByAccessor(interactionEntries, mapInteractionToRoute, filterOrTransformInteraction);
  } else {
    // mapInteractionsToRoutes: Returns the default mapping when no entries are provided
    return mapInteractionsToRoutes;
  }
}

// Export the function for use in other modules
module.exports = processInteractionsOrReturnDefault;