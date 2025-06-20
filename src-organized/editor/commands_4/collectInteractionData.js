/**
 * Collects and returns the provided interaction data components as an array.
 *
 * @param {Array} interactionEntries - An array of interaction entries to be processed.
 * @param {Object} config - Configuration object for processing interaction entries.
 * @param {Object} subscription - Subscription or context object related to the interaction processing.
 * @returns {Array} An array containing the interaction entries, configuration, and subscription.
 */
function collectInteractionData(interactionEntries, config, subscription) {
  // Simply returns the provided arguments as an array
  return [interactionEntries, config, subscription];
}

module.exports = collectInteractionData;
