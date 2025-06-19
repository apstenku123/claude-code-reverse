/**
 * Retrieves the configuration object for a given algorithm name from the KA5 mapping.
 * Throws an error if the algorithm name is not recognized.
 *
 * @param {string} algorithmName - The name of the algorithm to retrieve the configuration for.
 * @returns {any} The configuration object associated with the specified algorithm name.
 * @throws {Error} If the algorithm name is not found in the KA5 mapping.
 */
function getAlgorithmConfigByName(algorithmName) {
  // Retrieve the configuration object for the given algorithm name
  const algorithmConfig = KA5[algorithmName];
  if (algorithmConfig) {
    return algorithmConfig;
  }
  // Throw an error if the algorithm name is not recognized
  throw new Error(`Unknown algorithm "${algorithmName}"`);
}

module.exports = getAlgorithmConfigByName;