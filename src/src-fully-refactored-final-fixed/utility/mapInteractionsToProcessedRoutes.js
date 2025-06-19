/**
 * Processes an array of user interaction entries and maps them to processed routes using the provided configuration.
 *
 * @param {Array} interactionEntries - Array of user interaction entries to be mapped.
 * @param {Object} config - Configuration object used for processing the entries.
 * @returns {Array} Array of processed route objects, or an empty array if no entries are provided.
 */
function mapInteractionsToProcessedRoutes(interactionEntries, config) {
  // Check if interactionEntries is defined and has elements
  if (interactionEntries && interactionEntries.length) {
    // Process the configuration using Sq with a fixed value (2)
    const processedConfig = Sq(config, 2);
    // Map the interaction entries to routes using x4A
    return x4A(interactionEntries, processedConfig);
  } else {
    // Return an empty array if no interaction entries are provided
    return [];
  }
}

module.exports = mapInteractionsToProcessedRoutes;