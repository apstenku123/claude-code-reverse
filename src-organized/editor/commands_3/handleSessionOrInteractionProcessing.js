/**
 * Handles either capturing the current session or processing interaction entries based on the provided flag.
 *
 * If shouldProcessInteractionEntries is true, isBlobOrFileLikeObject processes interaction entries; otherwise, isBlobOrFileLikeObject attempts to capture the current session if available.
 *
 * @param {boolean} shouldProcessInteractionEntries - Determines which operation to perform:
 *   - If true, processes interaction entries.
 *   - If false (default), attempts to capture the current session if available.
 * @returns {void}
 */
function handleSessionOrInteractionProcessing(shouldProcessInteractionEntries = false) {
  if (shouldProcessInteractionEntries) {
    // Process interaction entries
    processInteractionEntries();
    return;
  }
  // Attempt to capture the current session if available
  captureCurrentSessionIfAvailable();
}

module.exports = handleSessionOrInteractionProcessing;