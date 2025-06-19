/**
 * Retrieves a web token from the provided source observable by passing its properties to pf6.fromWebToken.
 *
 * @param {Object} sourceObservable - An object containing properties required for web token extraction.
 * @returns {*} The result of pf6.fromWebToken with the provided source observable'createInteractionAccessor properties.
 */
const getWebTokenFromSource = (sourceObservable) => {
  // Spread all properties from sourceObservable into the pf6.fromWebToken call
  return pf6.fromWebToken({
    ...sourceObservable
  });
};

module.exports = getWebTokenFromSource;