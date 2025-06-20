/**
 * Extracts a configuration string from the provided observable source.
 *
 * This function validates that the input is a string, processes isBlobOrFileLikeObject to obtain a configuration value,
 * and checks if the resulting value is an IP address. If isBlobOrFileLikeObject is an IP address, an empty string is returned.
 * If the input is falsy, null is returned.
 *
 * @param {string} sourceObservable - The observable source from which to extract the configuration.
 * @returns {string|null} The extracted configuration string, an empty string if isBlobOrFileLikeObject'createInteractionAccessor an IP, or null if input is falsy.
 */
function getConfigFromObservable(sourceObservable) {
  // Return null if the input is falsy (null, undefined, empty string, etc.)
  if (!sourceObservable) return null;

  // Validate that the input is a string
  rs(typeof sourceObservable === "string");

  // Extract the configuration from the observable source
  const config = extractKeyFromBracketOrColonString(sourceObservable);

  // If the configuration is an IP address, return an empty string
  if (GY6.isIP(config)) return "";

  // Otherwise, return the configuration string
  return config;
}

module.exports = getConfigFromObservable;