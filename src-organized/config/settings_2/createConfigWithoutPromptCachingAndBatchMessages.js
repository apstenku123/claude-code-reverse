/**
 * Creates a configuration object from the provided source, removing specific properties.
 *
 * This utility function instantiates a configuration object using the dX constructor with the given sourceConfig.
 * It then removes the 'promptCaching' property from the configuration, as well as the 'batches' and 'countTokens'
 * properties from the nested 'messages' object. The cleaned configuration object is returned.
 *
 * @param {object} sourceConfig - The source configuration object used to initialize the configuration.
 * @returns {object} The configuration object with 'promptCaching', 'messages.batches', and 'messages.countTokens' removed.
 */
function createConfigWithoutPromptCachingAndBatchMessages(sourceConfig) {
  // Instantiate the configuration object using the provided source configuration
  const config = new dX(sourceConfig);

  // Remove the 'promptCaching' property from the configuration object
  delete config.promptCaching;

  // Remove the 'batches' and 'countTokens' properties from the nested 'messages' object
  delete config.messages.batches;
  delete config.messages.countTokens;

  // Return the cleaned configuration object
  return config;
}

module.exports = createConfigWithoutPromptCachingAndBatchMessages;