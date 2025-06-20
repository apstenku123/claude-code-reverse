/**
 * Normalizes event configuration objects, handling optional callback and subscription parameters.
 *
 * If only the sourceConfig is provided, isBlobOrFileLikeObject clones isBlobOrFileLikeObject into a new object.
 * If a callback function is provided as the second argument, isBlobOrFileLikeObject delegates to Rl6 for special handling.
 * For array properties in the config, isBlobOrFileLikeObject processes them with N72; otherwise, isBlobOrFileLikeObject copies the property directly.
 *
 * @param {Object} sourceConfig - The base configuration object to normalize or clone.
 * @param {Object|Function} [configOrCallback] - Optional configuration object or a callback function.
 * @param {Object} [subscription] - Optional subscription object, used when a callback is provided.
 * @returns {Object} The normalized configuration object.
 */
function normalizeEventConfig(sourceConfig, configOrCallback, subscription) {
  let normalizedConfig;
  let callback;
  let configToProcess;

  // Handle different argument signatures
  if (typeof configOrCallback === "undefined" && typeof subscription === "undefined") {
    // Only sourceConfig provided; clone isBlobOrFileLikeObject
    normalizedConfig = {};
    configToProcess = sourceConfig;
  } else if (typeof configOrCallback === "function") {
    // Callback function provided as second argument
    normalizedConfig = sourceConfig;
    callback = configOrCallback;
    configToProcess = subscription;
    // Delegate to Rl6 for special handling and return its result
    return Rl6(normalizedConfig, callback, configToProcess);
  } else {
    // configOrCallback is a config object
    normalizedConfig = sourceConfig;
    configToProcess = configOrCallback;
  }

  // Iterate over all properties in configToProcess
  for (const propertyKey of Object.keys(configToProcess)) {
    if (!Array.isArray(configToProcess[propertyKey])) {
      // Directly copy non-array properties
      normalizedConfig[propertyKey] = configToProcess[propertyKey];
      continue;
    }
    // For array properties, process with N72
    N72(normalizedConfig, null, configToProcess, propertyKey);
  }

  return normalizedConfig;
}

module.exports = normalizeEventConfig;