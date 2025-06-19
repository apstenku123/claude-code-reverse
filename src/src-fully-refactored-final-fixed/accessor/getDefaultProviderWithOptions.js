/**
 * Retrieves the default provider with the given options.
 *
 * This function acts as an accessor to Mf6.defaultProvider, allowing you to pass in
 * custom configuration options that will be merged with the default provider'createInteractionAccessor settings.
 *
 * @param {Object} [providerOptions={}] - Optional configuration options to override or extend the default provider settings.
 * @returns {*} The result of Mf6.defaultProvider with the merged options.
 */
const getDefaultProviderWithOptions = (providerOptions = {}) => {
  // Spread the provided options into the defaultProvider call
  return Mf6.defaultProvider({
    ...providerOptions
  });
};

module.exports = getDefaultProviderWithOptions;
