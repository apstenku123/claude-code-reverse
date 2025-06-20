/**
 * Maps an array of user interaction entries to routes using a configuration parameter.
 *
 * @param {Array} interactionEntries - Array of user interaction entries to be mapped.
 * @param {*} config - Configuration parameter used to process the mapping (passed to Sq).
 * @returns {Array} An array of mapped route objects, or an empty array if no interactions are provided.
 */
function mapInteractionsWithConfig(interactionEntries, config) {
  // Check if interactionEntries is a valid, non-empty array
  if (interactionEntries && interactionEntries.length) {
    // Process the config using Sq and pass the result to x4A along with the entries
    const processedConfig = Sq(config, 2);
    return x4A(interactionEntries, processedConfig);
  } else {
    // Return an empty array if there are no interaction entries
    return [];
  }
}

module.exports = mapInteractionsWithConfig;