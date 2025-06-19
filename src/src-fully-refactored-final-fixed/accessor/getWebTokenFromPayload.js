/**
 * Retrieves a web token from the provided payload using pf6.fromWebToken.
 *
 * @param {Object} payload - The payload object containing data required to generate the web token.
 * @returns {string} The generated web token as a string.
 */
const getWebTokenFromPayload = (payload) => {
  // Spread the payload object to ensure all properties are passed to fromWebToken
  return pf6.fromWebToken({
    ...payload
  });
};

module.exports = getWebTokenFromPayload;