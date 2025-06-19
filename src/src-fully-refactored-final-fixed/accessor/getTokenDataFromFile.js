/**
 * Retrieves token data from a file using the provided configuration options.
 *
 * @param {Object} [tokenFileOptions={}] - Optional configuration options for retrieving token data from file.
 * @returns {*} The result of df6.fromTokenFile with the provided options.
 */
const getTokenDataFromFile = (tokenFileOptions = {}) => {
  // Spread the provided options into the df6.fromTokenFile call
  return df6.fromTokenFile({
    ...tokenFileOptions
  });
};

module.exports = getTokenDataFromFile;