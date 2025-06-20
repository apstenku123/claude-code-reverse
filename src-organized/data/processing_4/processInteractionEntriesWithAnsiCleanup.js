/**
 * Processes an array of interaction entries, updating configuration state for each entry,
 * and applies ANSI color cleanup and reset to the processed result.
 *
 * @param {Array<any>} interactionEntries - Array of interaction entry objects to process.
 * @returns {Array<any>} Array of processed interaction entries with ANSI color cleanup applied.
 */
function processInteractionEntriesWithAnsiCleanup(interactionEntries) {
  // Initialize configuration state as an empty object
  let configState = {};
  // Array to store processed and cleaned interaction entries
  const processedEntries = [];

  // Iterate over each interaction entry
  for (let entryIndex = 0; entryIndex < interactionEntries.length; entryIndex++) {
    // Process the current entry with the current config state
    const processedEntry = applyAnsiStylesToString(configState, interactionEntries[entryIndex]);
    // Update the config state based on the processed entry
    configState = extractMatchesToObject(processedEntry);
    // Create a shallow copy of the updated config state
    const configStateCopy = Object.assign({}, configState);
    // Clean up ANSI color state and append reset codes to the processed entry
    const cleanedEntry = resetAnsiColorsAndCleanup(configStateCopy, processedEntry);
    // Store the cleaned entry in the result array
    processedEntries.push(cleanedEntry);
  }

  return processedEntries;
}

module.exports = processInteractionEntriesWithAnsiCleanup;