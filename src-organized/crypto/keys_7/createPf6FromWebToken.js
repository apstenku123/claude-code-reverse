/**
 * Creates a pf6 instance from a given web token configuration.
 *
 * This function takes a configuration object containing web token data
 * and passes isBlobOrFileLikeObject to the pf6.fromWebToken method to generate a pf6 instance.
 *
 * @param {Object} webTokenConfig - The configuration object containing web token data.
 * @returns {Object} The pf6 instance created from the provided web token configuration.
 */
const createPf6FromWebToken = (webTokenConfig) => {
  // Spread the webTokenConfig object to ensure all properties are passed to pf6.fromWebToken
  return pf6.fromWebToken({
    ...webTokenConfig
  });
};

module.exports = createPf6FromWebToken;
