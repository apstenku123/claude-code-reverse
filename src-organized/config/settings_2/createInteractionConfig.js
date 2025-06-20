/**
 * Creates a new interaction configuration object from the provided source observable,
 * and removes specific properties related to prompt caching and message batching/token counting.
 *
 * @param {any} sourceObservable - The observable or data source used to initialize the configuration.
 * @returns {object} The configuration object with certain properties removed.
 */
function createInteractionConfig(sourceObservable) {
  // Instantiate a new configuration object using the external dX constructor
  const config = new dX(sourceObservable);

  // Remove the promptCaching property from the configuration
  delete config.promptCaching;

  // Remove the batches and countTokens properties from the messages object
  delete config.messages.batches;
  delete config.messages.countTokens;

  // Return the cleaned configuration object
  return config;
}

module.exports = createInteractionConfig;