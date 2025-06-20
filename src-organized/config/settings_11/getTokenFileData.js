/**
 * Retrieves token file data using the provided configuration options.
 *
 * @param {Object} [tokenFileOptions={}] - Optional configuration options for retrieving the token file data.
 * @returns {*} The result of df6.fromTokenFile with the provided options.
 */
const getTokenFileData = (tokenFileOptions = {}) => {
  // Spread the provided options into the df6.fromTokenFile call
  return df6.fromTokenFile({
    ...tokenFileOptions
  });
};

module.exports = getTokenFileData;