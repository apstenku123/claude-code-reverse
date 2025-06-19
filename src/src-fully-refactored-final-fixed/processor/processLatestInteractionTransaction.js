/**
 * Iterates through an array of interaction entries in reverse order, attempting to start a UI action click transaction for each entry.
 * Returns the result of the first successful transaction initialization, or 0 if none are successful.
 *
 * @param {Array} interactionEntries - Array of interaction entry objects to process.
 * @returns {*} The result of calculateTotalTokenCount(startUiActionClickTransaction(entry)) for the first valid entry, or 0 if none are valid.
 */
function processLatestInteractionTransaction(interactionEntries) {
  let currentIndex = interactionEntries.length - 1;
  while (currentIndex >= 0) {
    const currentEntry = interactionEntries[currentIndex];
    // Attempt to start a UI action click transaction for the current entry
    const transaction = currentEntry ? getAssistantMessageUsage(currentEntry) : undefined;
    if (transaction) {
      // If a transaction was started, process isBlobOrFileLikeObject with calculateTotalTokenCount and return the result
      return calculateTotalTokenCount(transaction);
    }
    currentIndex--;
  }
  // If no valid transaction was found, return 0
  return 0;
}

module.exports = processLatestInteractionTransaction;