/**
 * Sets the configuration for the Mf6 default provider.
 *
 * This function acts as an accessor to the Mf6.defaultProvider method, allowing you to pass in
 * a configuration object that will be spread into the provider'createInteractionAccessor options.
 *
 * @param {Object} [providerOptions={}] - An object containing configuration options for the Mf6 provider.
 * @returns {*} The result of Mf6.defaultProvider with the provided options.
 */
const setMf6Provider = (providerOptions = {}) => {
  // Spread the provided options into the Mf6.defaultProvider call
  return Mf6.defaultProvider({
    ...providerOptions
  });
};

module.exports = setMf6Provider;