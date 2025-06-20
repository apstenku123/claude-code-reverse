/**
 * Normalizes and augments user agent options for a given configuration object.
 *
 * This function ensures that the customUserAgent property is always in the correct format,
 * and that userAgentAppId is a validated async provider with proper logging for invalid values.
 *
 * @param {Object} userAgentOptions - The options object containing user agent configuration.
 * @param {string} [userAgentOptions.userAgentAppId] - The application updateSnapshotAndNotify for the user agent (optional).
 * @param {string|Array} [userAgentOptions.customUserAgent] - Custom user agent string or array (optional).
 * @param {Object} [userAgentOptions.logger] - Logger instance for warnings (optional).
 * @returns {Object} The augmented options object with normalized customUserAgent and userAgentAppId provider.
 */
function normalizeUserAgentOptions(userAgentOptions) {
  // Normalize the userAgentAppId provider, using a fallback if not provided
  const normalizedAppIdProvider = FB4.normalizeProvider(
    userAgentOptions.userAgentAppId ?? FcA
  );

  // Destructure customUserAgent from options
  const { customUserAgent } = userAgentOptions;

  return Object.assign({}, userAgentOptions, {
    // Ensure customUserAgent is always a nested array if isBlobOrFileLikeObject'createInteractionAccessor a string
    customUserAgent: typeof customUserAgent === "string" ? [[customUserAgent]] : customUserAgent,

    // Provide a validated async provider for userAgentAppId
    userAgentAppId: mU(
      async () => {
        const appId = await normalizedAppIdProvider();

        // Validate the appId using isValidShortStringOrUndefined; if invalid, log warnings
        if (!isValidShortStringOrUndefined(appId)) {
          // Determine the logger to use: console if logger is missing or is NoOpLogger
          const logger =
            userAgentOptions.logger?.constructor?.name === "NoOpLogger" || !userAgentOptions.logger
              ? console
              : userAgentOptions.logger;

          // Warn if appId is not a string
          if (typeof appId !== "string") {
            logger?.warn("userAgentAppId must be a string or undefined.");
          } else if (appId.length > 50) {
            // Warn if appId exceeds 50 characters
            logger?.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.");
          }
        }
        return appId;
      },
      "userAgentAppId"
    )
  });
}

module.exports = normalizeUserAgentOptions;