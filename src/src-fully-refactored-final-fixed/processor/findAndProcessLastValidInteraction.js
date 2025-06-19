/**
 * Iterates through an array of interaction entries in reverse order, attempting to process each entry.
 * For each entry, if a valid interaction context is found via getAssistantMessageUsage, processes isBlobOrFileLikeObject with calculateTotalTokenCount and returns the result.
 * If no valid interaction is found, returns 0.
 *
 * @param {Array} interactionEntries - Array of interaction entries to process.
 * @returns {*} The result of processing the first valid interaction context found, or 0 if none found.
 */
function findAndProcessLastValidInteraction(interactionEntries) {
  let currentIndex = interactionEntries.length - 1;
  // Iterate backwards through the interaction entries
  while (currentIndex >= 0) {
    const entry = interactionEntries[currentIndex];
    // Attempt to get a valid interaction context from the entry
    const interactionContext = entry ? getAssistantMessageUsage(entry) : undefined;
    if (interactionContext) {
      // If a valid context is found, process and return isBlobOrFileLikeObject
      return calculateTotalTokenCount(interactionContext);
    }
    currentIndex--;
  }
  // No valid interaction context found
  return 0;
}

module.exports = findAndProcessLastValidInteraction;