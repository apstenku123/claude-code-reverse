/**
 * Checks if the provided config is null/undefined or if isBlobOrFileLikeObject matches the source observable using a custom matcher.
 *
 * @param {any} sourceObservable - The source observable or value to compare against.
 * @param {any} config - The configuration object or value to check. Can be null or undefined.
 * @returns {boolean} Returns true if config is null/undefined, or if arePropertiesValid(sourceObservable, config, lQ(config)) returns true.
 */
function isConfigNullOrMatchesSource(sourceObservable, config) {
  // If config is null or undefined, return true
  if (config == null) {
    return true;
  }
  // Otherwise, check if the source matches the config using arePropertiesValid and lQ
  return arePropertiesValid(sourceObservable, config, lQ(config));
}

module.exports = isConfigNullOrMatchesSource;