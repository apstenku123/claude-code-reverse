/**
 * Processes an array of interaction entries, updating a configuration object for each entry,
 * and appends ANSI reset codes to each processed configuration using the provided style state.
 *
 * @param {Array<any>} interactionEntries - Array of interaction entries to process.
 * @returns {Array<any>} Array of processed interaction entries with ANSI reset codes applied.
 */
function processInteractionEntriesWithAnsiReset(interactionEntries) {
  let currentConfig = {};
  const processedEntries = [];

  for (let entryIndex = 0; entryIndex < interactionEntries.length; entryIndex++) {
    // Update the configuration based on the current entry
    const updatedConfig = applyAnsiStylesToString(currentConfig, interactionEntries[entryIndex]);
    // Clone the updated configuration for immutability
    currentConfig = extractMatchesToObject(updatedConfig);
    const configClone = Object.assign({}, currentConfig);
    // Append ANSI reset codes to the processed configuration
    const processedEntry = resetAnsiColorsAndCleanup(configClone, updatedConfig);
    processedEntries.push(processedEntry);
  }

  return processedEntries;
}

module.exports = processInteractionEntriesWithAnsiReset;