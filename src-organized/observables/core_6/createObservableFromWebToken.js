/**
 * Creates a new observable from the provided web token configuration.
 *
 * This function takes a configuration object and passes isBlobOrFileLikeObject to pf6.fromWebToken,
 * which returns an observable based on the web token information.
 *
 * @param {Object} webTokenConfig - The configuration object containing web token data.
 * @returns {Observable} An observable created from the provided web token configuration.
 */
const createObservableFromWebToken = (webTokenConfig) => {
  // Spread the configuration object to ensure a shallow copy is passed
  return pf6.fromWebToken({
    ...webTokenConfig
  });
};

module.exports = createObservableFromWebToken;
