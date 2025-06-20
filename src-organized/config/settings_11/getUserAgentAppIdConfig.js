/**
 * Returns a configuration object with a normalized user agent app updateSnapshotAndNotify provider and a formatted custom user agent.
 *
 * @param {Object} options - The configuration options.
 * @param {string} [options.userAgentAppId] - Optional user agent application updateSnapshotAndNotify or provider.
 * @param {string|Array} [options.customUserAgent] - Optional custom user agent string or array.
 * @param {Object} [options.logger] - Optional logger instance for warnings.
 * @returns {Object} The updated configuration object with normalized userAgentAppId and customUserAgent.
 */
function getUserAgentAppIdConfig(options) {
  // Normalize the userAgentAppId provider, defaulting to FcA if not provided
  const normalizeUserAgentAppIdProvider = FB4.normalizeProvider(options.userAgentAppId ?? FcA);

  // Destructure customUserAgent from options
  const { customUserAgent } = options;

  // Format customUserAgent: always as a nested array if isBlobOrFileLikeObject'createInteractionAccessor a string, otherwise leave as is
  const formattedCustomUserAgent = typeof customUserAgent === "string" ? [[customUserAgent]] : customUserAgent;

  // Define a provider for userAgentAppId with validation and logging
  const userAgentAppIdProvider = mU(
    async () => {
      const userAgentAppId = await normalizeUserAgentAppIdProvider();
      // Validate the userAgentAppId
      if (!isValidShortStringOrUndefined(userAgentAppId)) {
        // Use the provided logger unless isBlobOrFileLikeObject'createInteractionAccessor a NoOpLogger or not provided, then fallback to console
        const logger = options.logger?.constructor?.name === "NoOpLogger" || !options.logger ? console : options.logger;
        if (typeof userAgentAppId !== "string") {
          logger?.warn("userAgentAppId must be a string or undefined.");
        } else if (userAgentAppId.length > 50) {
          logger?.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.");
        }
      }
      return userAgentAppId;
    },
    "userAgentAppId"
  );

  // Return the updated configuration object
  return Object.assign(options, {
    customUserAgent: formattedCustomUserAgent,
    userAgentAppId: userAgentAppIdProvider
  });
}

module.exports = getUserAgentAppIdConfig;