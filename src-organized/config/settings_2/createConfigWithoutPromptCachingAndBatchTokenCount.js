/**
 * Creates a new configuration object from the given source observable, removing specific properties.
 *
 * This function instantiates a new configuration using the provided source observable.
 * It then removes the 'promptCaching' property from the configuration, as well as the
 * 'batches' and 'countTokens' properties from the configuration'createInteractionAccessor 'messages' object.
 *
 * @param {any} sourceObservable - The source observable or configuration input used to instantiate the config object.
 * @returns {object} The new configuration object with selected properties removed.
 */
function createConfigWithoutPromptCachingAndBatchTokenCount(sourceObservable) {
  // Instantiate a new configuration object using the external dX constructor
  const config = new dX(sourceObservable);

  // Remove the 'promptCaching' property from the config object
  delete config.promptCaching;

  // Remove 'batches' and 'countTokens' from the 'messages' property of the config object
  delete config.messages.batches;
  delete config.messages.countTokens;

  // Return the cleaned configuration object
  return config;
}

module.exports = createConfigWithoutPromptCachingAndBatchTokenCount;