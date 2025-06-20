/**
 * Returns the default provider with optional override properties.
 *
 * This function calls Mf6.defaultProvider, spreading any properties from the overrides object
 * into the provider configuration. This allows callers to customize the provider'createInteractionAccessor behavior.
 *
 * @param {Object} [overrides={}] - Optional properties to override the default provider configuration.
 * @returns {*} The result of Mf6.defaultProvider with the merged configuration.
 */
const getDefaultProviderWithOverrides = (overrides = {}) => {
  // Merge the overrides into the default provider configuration
  return Mf6.defaultProvider({
    ...overrides
  });
};

module.exports = getDefaultProviderWithOverrides;
