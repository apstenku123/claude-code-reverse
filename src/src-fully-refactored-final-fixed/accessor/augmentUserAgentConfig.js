/**
 * Enhances the provided configuration object with normalized user agent properties.
 *
 * - Normalizes the customUserAgent property to always be an array of arrays (if string).
 * - Wraps userAgentAppId in a named async provider with validation and logging.
 *
 * @param {Object} config - The configuration object to augment.
 * @param {string} [config.userAgentAppId] - Optional user agent application updateSnapshotAndNotify.
 * @param {string|Array} [config.customUserAgent] - Optional custom user agent string or array.
 * @param {Object} [config.logger] - Optional logger object for warnings.
 * @returns {Object} The augmented configuration object with normalized user agent properties.
 */
function augmentUserAgentConfig(config) {
  // Normalize the provider for userAgentAppId, using a default if not provided
  const normalizedUserAgentAppIdProvider = FB4.normalizeProvider(config.userAgentAppId ?? FcA);

  // Destructure customUserAgent from config
  const { customUserAgent } = config;

  return Object.assign(config, {
    // Ensure customUserAgent is always an array of arrays if originally a string
    customUserAgent: typeof customUserAgent === "string" ? [[customUserAgent]] : customUserAgent,
    // Define a named async provider for userAgentAppId with validation and logging
    userAgentAppId: mU(async () => {
      const userAgentAppIdValue = await normalizedUserAgentAppIdProvider();
      // Validate the userAgentAppId value
      if (!isValidShortStringOrUndefined(userAgentAppIdValue)) {
        // Determine the logger to use (fallback to console if logger is missing or NoOpLogger)
        const logger =
          config.logger?.constructor?.name === "NoOpLogger" || !config.logger
            ? console
            : config.logger;
        // Warn if userAgentAppId is not a string
        if (typeof userAgentAppIdValue !== "string") {
          logger?.warn("userAgentAppId must be a string or undefined.");
        } else if (userAgentAppIdValue.length > 50) {
          // Warn if userAgentAppId exceeds 50 characters
          logger?.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.");
        }
      }
      return userAgentAppIdValue;
    }, "userAgentAppId")
  });
}

module.exports = augmentUserAgentConfig;