/**
 * Initializes and configures the Sentry Node SDK with sensible defaults and environment overrides.
 * Sets up integrations, transport, stack parser, and handles auto session tracking and Spotlight integration.
 *
 * @param {Object} [options={}] - Sentry initialization options. May be partially filled; missing values are inferred from environment or defaults.
 * @returns {void}
 */
function initializeSentryNodeSdk(options = {}) {
  // Ensure the Node async context strategy is set for Sentry
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
    const parsedSampleRate = parseFloat(tracesSampleRateEnv);
    if (isFinite(parsedSampleRate)) {
      options.tracesSampleRate = parsedSampleRate;
    }
  }

  // Set release from getReleaseIdentifier() if not provided; disable autoSessionTracking if release is unavailable
  if (options.release === undefined) {
    const releaseValue = getReleaseIdentifier();
    if (releaseValue !== undefined) {
      options.release = releaseValue;
    } else {
      options.autoSessionTracking = false;
    }
  }

  // Set environment from process.env if not provided
  if (options.environment === undefined && process.env.SENTRY_ENVIRONMENT) {
    options.environment = process.env.SENTRY_ENVIRONMENT;
  }

  // Enable autoSessionTracking by default if dsn is set and autoSessionTracking is not specified
  if (options.autoSessionTracking === undefined && options.dsn !== undefined) {
    options.autoSessionTracking = true;
  }

  // Set default instrumenter if not provided
  if (options.instrumenter === undefined) {
    options.instrumenter = "sentry";
  }

  // Prepare the final Sentry client options
  const clientOptions = {
    ...options,
    stackParser: KP.stackParserFromStackParserOptions(options.stackParser || iZA),
    integrations: bJ.getIntegrationsToSetup(options),
    transport: options.transport || uI9.makeNodeTransport
  };

  // Initialize and bind the Sentry client
  bJ.initAndBind(options.clientClass || _I9.NodeClient, clientOptions);

  // Start auto session tracking if enabled
  if (options.autoSessionTracking) {
    lI9();
  }

  // Perform additional initialization if iI9 returns truthy and Spotlight integration is requested
  if (iI9() && options.spotlight) {
    const sentryClient = bJ.getClient();
    if (sentryClient && sentryClient.addIntegration) {
      // Add all integrations from client options
      const integrations = sentryClient.getOptions().integrations;
      for (const integration of integrations) {
        sentryClient.addIntegration(integration);
      }
      // Add the Spotlight integration with optional sidecarUrl
      sentryClient.addIntegration(
        hI9.spotlightIntegration({
          sidecarUrl: typeof options.spotlight === "string" ? options.spotlight : undefined
        })
      );
    }
  }
}

module.exports = initializeSentryNodeSdk;