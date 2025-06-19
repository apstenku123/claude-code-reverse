/**
 * Creates a new QK configuration object from the provided input, removing internal properties.
 *
 * @param {any} sourceConfig - The source configuration object to be wrapped by QK.
 * @returns {object} The QK configuration object with 'batches' and 'countTokens' properties removed.
 */
function createConfigWithoutInternalProperties(sourceConfig) {
  // Instantiate a new QK configuration object using the provided source configuration
  const config = new QK(sourceConfig);

  // Remove internal properties that should not be exposed
  delete config.batches;
  delete config.countTokens;

  // Return the sanitized configuration object
  return config;
}

module.exports = createConfigWithoutInternalProperties;