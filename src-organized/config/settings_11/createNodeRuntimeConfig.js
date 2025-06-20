/**
 * Creates and returns the runtime configuration object for a Node.js environment,
 * merging user-provided configuration with sensible defaults and environment-based values.
 *
 * @param {Object} userConfig - The user-supplied configuration options for the client.
 * @returns {Object} The fully resolved runtime configuration object for Node.js clients.
 */
function createNodeRuntimeConfig(userConfig) {
  // Emit warnings if the Node.js version is unsupported
  zw4.emitWarningIfUnsupportedVersion(process.version);
  h00.emitWarningIfUnsupportedVersion(process.version);

  // Resolve the defaults mode configuration (returns a function that resolves to a mode string)
  const resolveDefaultsMode = Hw4.resolveDefaultsModeConfig(userConfig);

  // Helper to load configs for the current default mode
  const loadDefaultModeConfigs = () => resolveDefaultsMode().then(Kw4.loadConfigsForDefaultMode);

  // Get the base runtime config for Node.js
  const baseRuntimeConfig = Vw4.getRuntimeConfig(userConfig);

  // Prepare profile context for config loaders
  const profileContext = {
    profile: userConfig?.profile
  };

  return {
    // Merge base runtime config and user config
    ...baseRuntimeConfig,
    ...userConfig,
    runtime: "node",
    defaultsMode: resolveDefaultsMode,
    // Use provided bodyLengthChecker or default implementation
    bodyLengthChecker: userConfig?.bodyLengthChecker ?? Xw4.calculateBodyLength,
    // Use provided user agent provider or default
    defaultUserAgentProvider: userConfig?.defaultUserAgentProvider ?? m00.createDefaultUserAgentProvider({
      serviceId: baseRuntimeConfig.serviceId,
      clientVersion: Ww4.default.version
    }),
    // HTTP authentication schemes, with default SigV4 and noAuth
    httpAuthSchemes: userConfig?.httpAuthSchemes ?? [
      {
        schemeId: "aws.auth#sigv4",
        identityProvider: (authContext) =>
          authContext.getIdentityProvider("aws.auth#sigv4") ||
          (async (providerContext) =>
            await userConfig.credentialDefaultProvider(providerContext?.__config || {})()
          ),
        signer: new h00.AwsSdkSigV4Signer()
      },
      {
        schemeId: "smithy.api#noAuth",
        identityProvider: (authContext) =>
          authContext.getIdentityProvider("smithy.api#noAuth") ||
          (async () => ({})),
        signer: new Fw4.NoAuthSigner()
      }
    ],
    // Maximum retry attempts
    maxAttempts: userConfig?.maxAttempts ?? Jb.loadConfig(d00.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, userConfig),
    // AWS region
    region: userConfig?.region ?? Jb.loadConfig(LQ1.NODE_REGION_CONFIG_OPTIONS, {
      ...LQ1.NODE_REGION_CONFIG_FILE_OPTIONS,
      ...profileContext
    }),
    // HTTP request handler
    requestHandler: u00.NodeHttpHandler.create(userConfig?.requestHandler ?? loadDefaultModeConfigs),
    // Retry mode
    retryMode: userConfig?.retryMode ?? Jb.loadConfig({
      ...d00.NODE_RETRY_MODE_CONFIG_OPTIONS,
      default: async () => (await loadDefaultModeConfigs()).retryMode || Cw4.DEFAULT_RETRY_MODE
    }, userConfig),
    // SHA256 hash constructor
    sha256: userConfig?.sha256 ?? Jw4.Hash.bind(null, "sha256"),
    // Stream collector for Node.js
    streamCollector: userConfig?.streamCollector ?? u00.streamCollector,
    // Dualstack endpoint usage
    useDualstackEndpoint: userConfig?.useDualstackEndpoint ?? Jb.loadConfig(LQ1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, profileContext),
    // FIPS endpoint usage
    useFipsEndpoint: userConfig?.useFipsEndpoint ?? Jb.loadConfig(LQ1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, profileContext),
    // User agent application updateSnapshotAndNotify
    userAgentAppId: userConfig?.userAgentAppId ?? Jb.loadConfig(m00.NODE_APP_ID_CONFIG_OPTIONS, profileContext)
  };
}

module.exports = { createNodeRuntimeConfig };