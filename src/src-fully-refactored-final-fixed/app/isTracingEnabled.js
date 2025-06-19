/**
 * Determines if tracing is enabled based on Sentry configuration options.
 *
 * This function checks if Sentry tracing is globally disabled via the __SENTRY_TRACING__ flag.
 * If not disabled, isBlobOrFileLikeObject retrieves the current Sentry client and its options (unless options are provided directly).
 * It then checks if tracing is enabled by looking for specific tracing-related options.
 *
 * @param {object} [options] - Optional Sentry configuration options. If not provided, options are retrieved from the current Sentry client.
 * @returns {boolean} True if tracing is enabled via options; otherwise, false.
 */
function isTracingEnabled(options) {
  // If the global Sentry tracing flag is explicitly set to false, tracing is disabled
  if (typeof __SENTRY_TRACING__ === "boolean" && !__SENTRY_TRACING__) {
    return false;
  }

  // Retrieve the current Sentry client
  const sentryClient = Ft2.getClient();

  // Use provided options, or fall back to the client'createInteractionAccessor options if available
  const sentryOptions = options || (sentryClient && sentryClient.getOptions());

  // Tracing is enabled if any of these options are set:
  // - enableTracing is true
  // - tracesSampleRate is present in options
  // - tracesSampler is present in options
  return !!sentryOptions && (
    sentryOptions.enableTracing === true ||
    'tracesSampleRate' in sentryOptions ||
    'tracesSampler' in sentryOptions
  );
}

module.exports = isTracingEnabled;
