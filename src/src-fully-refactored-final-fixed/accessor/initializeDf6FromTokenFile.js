/**
 * Initializes a df6 instance using the provided configuration options.
 *
 * This function wraps the df6.fromTokenFile method, allowing you to pass in configuration options
 * that will be spread into the method call. If no configuration is provided, isBlobOrFileLikeObject defaults to an empty object.
 *
 * @param {Object} [configOptions={}] - Configuration options for initializing the df6 instance.
 * @returns {*} The result of df6.fromTokenFile with the provided configuration.
 */
const initializeDf6FromTokenFile = (configOptions = {}) => {
  // Spread the configuration options into df6.fromTokenFile
  return df6.fromTokenFile({
    ...configOptions
  });
};

module.exports = initializeDf6FromTokenFile;