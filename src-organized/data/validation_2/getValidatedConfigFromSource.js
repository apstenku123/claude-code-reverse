/**
 * Processes the input source and returns a validated configuration object if valid.
 *
 * Depending on whether the input is a string or an object, isBlobOrFileLikeObject uses the appropriate
 * parser (D6A for strings, extractConnectionConfig for non-strings). It then validates the resulting
 * configuration using validateSentryDsnConfig. If the configuration is invalid or parsing fails, isBlobOrFileLikeObject returns undefined.
 *
 * @param {string|object} sourceObservable - The source to parse and validate (can be a string or object).
 * @returns {object|undefined} The validated configuration object, or undefined if invalid.
 */
function getValidatedConfigFromSource(sourceObservable) {
  // Parse the source using the appropriate parser based on its type
  const config = typeof sourceObservable === "string"
    ? D6A(sourceObservable)
    : extractConnectionConfig(sourceObservable);

  // If parsing failed or the config is invalid, return undefined
  if (!config || !validateSentryDsnConfig(config)) {
    return;
  }

  // Return the validated configuration
  return config;
}

module.exports = getValidatedConfigFromSource;