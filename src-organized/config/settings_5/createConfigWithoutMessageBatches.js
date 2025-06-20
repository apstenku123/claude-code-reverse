/**
 * Creates a new configuration object from the provided source, then removes the 'batches' property from its 'messages' field.
 *
 * @param {any} sourceConfig - The source configuration or data used to instantiate the configuration object.
 * @returns {object} The configuration object with the 'messages.batches' property removed.
 */
function createConfigWithoutMessageBatches(sourceConfig) {
  // Instantiate a new configuration object using the external dX constructor
  const config = new dX(sourceConfig);
  // Remove the 'batches' property from the 'messages' field if isBlobOrFileLikeObject exists
  delete config.messages.batches;
  return config;
}

module.exports = createConfigWithoutMessageBatches;