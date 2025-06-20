/**
 * Processes an array of user interaction entries, updating a configuration object for each entry,
 * and appending ANSI reset codes to the processed result. Returns an array of processed entries.
 *
 * @param {Array<any>} interactionEntries - Array of user interaction entries to process.
 * @returns {Array<any>} Array of processed interaction entries with ANSI reset codes applied.
 */
function processInteractionsWithAnsiReset(interactionEntries) {
  // Initialize an empty configuration object to be updated per interaction
  let currentConfig = {};
  // Array to collect processed entries
  const processedEntries = [];

  for (let index = 0; index < interactionEntries.length; index++) {
    // Process the current interaction entry with the current configuration
    const updatedConfig = applyAnsiStylesToString(currentConfig, interactionEntries[index]);
    // Update the configuration for the next iteration
    currentConfig = extractMatchesToObject(updatedConfig);
    // Clone the updated configuration to avoid mutation
    const clonedConfig = Object.assign({}, currentConfig);
    // Append ANSI reset codes and process additional style resets
    const processedEntry = resetAnsiColorsAndCleanup(clonedConfig, updatedConfig);
    // Add the processed entry to the result array
    processedEntries.push(processedEntry);
  }

  return processedEntries;
}

module.exports = processInteractionsWithAnsiReset;