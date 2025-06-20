/**
 * Extracts and validates a configuration object from the provided input.
 *
 * If the input is a string, isBlobOrFileLikeObject attempts to parse isBlobOrFileLikeObject using D6A. If isBlobOrFileLikeObject'createInteractionAccessor not a string,
 * isBlobOrFileLikeObject processes the input with extractConnectionConfig. After extraction, the configuration is validated
 * using validateSentryDsnConfig. If the configuration is invalid or missing, the function returns undefined.
 *
 * @param {string|object} input - The input to extract the configuration from. Can be a string or an object.
 * @returns {object|undefined} The validated configuration object, or undefined if invalid or not found.
 */
function getValidatedConfigFromInput(input) {
  // Determine the configuration object based on the input type
  const config = typeof input === "string" ? D6A(input) : extractConnectionConfig(input);

  // If config is falsy or fails validation, return undefined
  if (!config || !validateSentryDsnConfig(config)) {
    return;
  }

  // Return the validated configuration
  return config;
}

module.exports = getValidatedConfigFromInput;
