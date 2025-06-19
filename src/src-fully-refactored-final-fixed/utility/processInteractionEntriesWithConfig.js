/**
 * Processes an array of interaction entries with a given configuration.
 *
 * If the interactionEntries array is non-empty, isBlobOrFileLikeObject applies a transformation to the config
 * using the Sq function, then passes both to the x4A function for further processing.
 * If the interactionEntries array is empty or undefined, returns an empty array.
 *
 * @param {Array} interactionEntries - Array of interaction entry objects to process.
 * @param {Object} config - Configuration object used to process the entries.
 * @returns {Array} The result of processing the interaction entries, or an empty array if none are provided.
 */
function processInteractionEntriesWithConfig(interactionEntries, config) {
  // Check if interactionEntries is defined and has at least one element
  if (interactionEntries && interactionEntries.length) {
    // Transform the config using Sq with a fixed argument (2), then process entries with x4A
    const transformedConfig = Sq(config, 2);
    return x4A(interactionEntries, transformedConfig);
  }
  // Return an empty array if there are no interaction entries
  return [];
}

module.exports = processInteractionEntriesWithConfig;