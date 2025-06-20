/**
 * Retrieves an optional configuration value from the provided source object using vl2._optionalChain.
 * If the configuration is null or undefined, returns true; otherwise, returns the configuration value.
 *
 * @param {any} sourceObject - The object from which to extract the optional configuration.
 * @returns {any} - The extracted configuration value, or true if the value is null or undefined.
 */
function getOptionalConfigOrTrue(sourceObject) {
  // Use vl2._optionalChain to safely extract the configuration value
  const configValue = vl2._optionalChain(sourceObject);
  // If configValue is null or undefined, return true; otherwise, return the value
  return configValue == null ? true : configValue;
}

module.exports = getOptionalConfigOrTrue;