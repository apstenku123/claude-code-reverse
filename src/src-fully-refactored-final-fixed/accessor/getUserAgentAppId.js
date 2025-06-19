/**
 * Retrieves and normalizes the user agent application updateSnapshotAndNotify from the provided configuration object.
 * Ensures the custom user agent is in the correct format and wraps the userAgentAppId property
 * with validation and logging. Returns a new configuration object with these properties updated.
 *
 * @param {Object} config - The configuration object containing user agent and logger information.
 * @param {string} [config.userAgentAppId] - Optional user agent application updateSnapshotAndNotify to be normalized.
 * @param {string|Array} [config.customUserAgent] - Optional custom user agent string or array.
 * @param {Object} [config.logger] - Optional logger object for warnings.
 * @returns {Object} The updated configuration object with normalized userAgentAppId and customUserAgent.
 */
function getUserAgentAppId(config) {
  // Normalize the userAgentAppId provider, using a fallback if not present
  const normalizeUserAgentAppIdProvider = FB4.normalizeProvider(config.userAgentAppId ?? FcA);
  const { customUserAgent } = config;

  return Object.assign({}, config, {
    // Ensure customUserAgent is always an array of arrays if isBlobOrFileLikeObject'createInteractionAccessor a string
    customUserAgent: typeof customUserAgent === "string" ? [[customUserAgent]] : customUserAgent,
    userAgentAppId: mU(async () => {
      const userAgentAppIdValue = await normalizeUserAgentAppIdProvider();
      // Validate the userAgentAppId value
      if (!isValidShortStringOrUndefined(userAgentAppIdValue)) {
        // Determine which logger to use (console if no logger or NoOpLogger)
        const logger =
          config.logger?.constructor?.name === "NoOpLogger" || !config.logger
            ? console
            : config.logger;
        // Warn if the value is not a string
        if (typeof userAgentAppIdValue !== "string") {
          logger?.warn("userAgentAppId must be a string or undefined.");
        } else if (userAgentAppIdValue.length > 50) {
          // Warn if the string exceeds 50 characters
          logger?.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.");
        }
      }
      return userAgentAppIdValue;
    }, "userAgentAppId")
  });
}

module.exports = getUserAgentAppId;