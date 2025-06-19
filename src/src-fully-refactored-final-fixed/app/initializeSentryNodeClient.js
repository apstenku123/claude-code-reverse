/**
 * Initializes and configures the Sentry Node client with sensible defaults and environment overrides.
 *
 * This function sets up the Sentry Node client using the provided options, falling back to environment variables
 * and default integrations where appropriate. It also handles special cases such as auto session tracking and
 * spotlight integration.
 *
 * @param {Object} [options={}] - Configuration options for initializing the Sentry Node client.
 * @param {Array} [options.defaultIntegrations] - List of default integrations to use (optional).
 * @param {string} [options.dsn] - The Sentry Data Source Name (DSN) (optional).
 * @param {number} [options.tracesSampleRate] - The sample rate for tracing (optional).
 * @param {string} [options.release] - The release version identifier (optional).
 * @param {string} [options.environment] - The environment name (optional).
 * @param {boolean} [options.autoSessionTracking] - Whether to enable automatic session tracking (optional).
 * @param {string} [options.instrumenter] - The instrumenter to use (optional).
 * @param {Function} [options.transport] - Custom transport function (optional).
 * @param {Function} [options.clientClass] - Custom Sentry client class (optional).
 * @param {Function} [options.stackParser] - Custom stack parser (optional).
 * @param {boolean|string} [options.spotlight] - Spotlight integration or URL (optional).
 * @returns {void}
 */
function initializeSentryNodeClient(options = {}) {
  // Ensure Node async context strategy is set for Sentry
  SI9.setNodeAsyncContextStrategy();

  // Set default integrations if not provided
  if (options.defaultIntegrations === undefined) {
    options.defaultIntegrations = cZA();
  }

  // Set DSN from environment if not provided
  if (options.dsn === undefined && process.env.SENTRY_DSN) {
    options.dsn = process.env.SENTRY_DSN;
  }

  // Set tracesSampleRate from environment if not provided
  const tracesSampleRateEnv = process.env.SENTRY_TRACES_SAMPLE_RATE;
  if (options.tracesSampleRate === undefined && tracesSampleRateEnv) {
    const tracesSampleRate = parseFloat(tracesSampleRateEnv);
    if (isFinite(tracesSampleRate)) {
      options.tracesSampleRate = tracesSampleRate;
    }
  }

  // Set release from helper if not provided; disable autoSessionTracking if release is unavailable
  if (options.release === undefined) {
    const release = getReleaseIdentifier();
    if (release !== undefined) {
      options.release = release;
    } else {
      options.autoSessionTracking = false;
    }
  }

  // Set environment from environment variable if not provided
  if (options.environment === undefined && process.env.SENTRY_ENVIRONMENT) {
    options.environment = process.env.SENTRY_ENVIRONMENT;
  }

  // Enable autoSessionTracking if not explicitly set and DSN is present
  if (options.autoSessionTracking === undefined && options.dsn !== undefined) {
    options.autoSessionTracking = true;
  }

  // Set default instrumenter if not provided
  if (options.instrumenter === undefined) {
    options.instrumenter = "sentry";
  }

  // Prepare the final Sentry client options
  const sentryClientOptions = {
    ...options,
    stackParser: KP.stackParserFromStackParserOptions(options.stackParser || iZA),
    integrations: bJ.getIntegrationsToSetup(options),
    transport: options.transport || uI9.makeNodeTransport
  };

  // Initialize and bind the Sentry client
  bJ.initAndBind(options.clientClass || _I9.NodeClient, sentryClientOptions);

  // Start auto session tracking if enabled
  if (options.autoSessionTracking) {
    lI9();
  }

  // Perform additional initialization (possibly flush or setup)
  iI9();

  // If spotlight integration is requested, add isBlobOrFileLikeObject to the client
  if (options.spotlight) {
    const client = bJ.getClient();
    if (client && client.addIntegration) {
      // Add all existing integrations again (possibly to ensure they're registered)
      const existingIntegrations = client.getOptions().integrations;
      for (const integration of existingIntegrations) {
        client.addIntegration(integration);
      }
      // Add the spotlight integration with optional sidecarUrl
      client.addIntegration(hI9.spotlightIntegration({
        sidecarUrl: typeof options.spotlight === "string" ? options.spotlight : undefined
      }));
    }
  }
}

module.exports = initializeSentryNodeClient;