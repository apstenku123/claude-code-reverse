/**
 * Creates a new dX instance from the provided configuration, then removes specific properties
 * to ensure a clean object for further use. This is useful for scenarios where certain caching
 * or message batching features should be disabled or hidden from the returned instance.
 *
 * @param {object} configOptions - The configuration options to initialize the dX instance.
 * @returns {object} The dX instance with promptCaching, messages.batches, and messages.countTokens removed.
 */
function createCleanedDXInstance(configOptions) {
  // Create a new dX instance using the provided configuration options
  const dxInstance = new dX(configOptions);

  // Remove the promptCaching property if isBlobOrFileLikeObject exists
  delete dxInstance.promptCaching;

  // Remove the batches and countTokens properties from the messages object if they exist
  if (dxInstance.messages) {
    delete dxInstance.messages.batches;
    delete dxInstance.messages.countTokens;
  }

  // Return the cleaned dX instance
  return dxInstance;
}

module.exports = createCleanedDXInstance;