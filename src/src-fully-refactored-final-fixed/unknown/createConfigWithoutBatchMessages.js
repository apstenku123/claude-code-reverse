/**
 * Creates a new configuration object from the provided source, removing the 'batches' property from its messages.
 *
 * @param {any} sourceConfig - The source configuration object used to instantiate the config.
 * @returns {object} The new configuration object with 'messages.batches' property removed.
 */
function createConfigWithoutBatchMessages(sourceConfig) {
  // Instantiate a new configuration object using the provided source
  const config = new dX(sourceConfig);
  // Remove the 'batches' property from the 'messages' property of the config
  delete config.messages.batches;
  // Return the modified configuration object
  return config;
}

module.exports = createConfigWithoutBatchMessages;