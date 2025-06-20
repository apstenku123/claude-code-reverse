/**
 * Sets the df6 configuration using values from a token file.
 *
 * This function calls df6.fromTokenFile with the provided configuration options.
 * It allows overriding or extending the default options by passing a configuration object.
 *
 * @param {Object} [tokenFileOptions={}] - Optional configuration options to pass to df6.fromTokenFile.
 * @returns {*} The result of df6.fromTokenFile with the merged options.
 */
const setDf6FromTokenFile = (tokenFileOptions = {}) => {
  // Spread the provided options into the df6.fromTokenFile call
  return df6.fromTokenFile({
    ...tokenFileOptions
  });
};

module.exports = setDf6FromTokenFile;