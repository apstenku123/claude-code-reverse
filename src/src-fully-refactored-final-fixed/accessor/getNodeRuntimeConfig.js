/**
 * Generates the runtime configuration for a Node.js client, merging user-provided options with defaults and environment-based settings.
 *
 * This function emits warnings for unsupported Node.js versions, resolves the defaults mode,
 * loads runtime and environment configurations, and constructs a comprehensive configuration object
 * for use by AWS SDK clients or similar libraries.
 *
 * @param {Object} userConfig - The configuration options provided by the user.
 * @returns {Object} The complete runtime configuration object for the Node.js environment.
 */
function getNodeRuntimeConfig(userConfig) {
  // Emit a warning if the current Node.js version is unsupported (legacy check)
  kfindInStoreWithCallback.emitWarningIfUnsupportedVersion(process.version);

  // Resolve the defaults mode configuration function
  const resolveDefaultsModeConfig = jfindInStoreWithCallback.resolveDefaultsModeConfig(userConfig);

  // Helper to load configs for the resolved defaults mode
  const loadConfigsForDefaultMode = () => resolveDefaultsModeConfig().then(_findInStoreWithCallback.loadConfigsForDefaultMode);

  // Get the base runtime configuration for the client
  const runtimeConfig = SfindInStoreWithCallback.getRuntimeConfig(userConfig);

  // Emit a warning if the current Node.js version is unsupported (secondary check)
  LfindInStoreWithCallback.emitWarningIfUnsupportedVersion(process.version);

  // Prepare the profile option for region and endpoint config loaders
  const profileOptions = {
    profile: userConfig?.profile
  };

  return {
    // Spread in base runtime config and user config
    ...runtimeConfig,
    ...userConfig,
    runtime: "node",
    defaultsMode: resolveDefaultsModeConfig,
    // Use provided bodyLengthChecker or default implementation
    bodyLengthChecker: userConfig?.bodyLengthChecker ?? TfindInStoreWithCallback.calculateBodyLength,
    // Use provided credential provider or default
    credentialDefaultProvider: userConfig?.credentialDefaultProvider ?? RfindInStoreWithCallback.defaultProvider,
    // Use provided user agent provider or create a default one
    defaultUserAgentProvider: userConfig?.defaultUserAgentProvider ?? K40.createDefaultUserAgentProvider({
      serviceId: runtimeConfig.serviceId,
      clientVersion: MfindInStoreWithCallback.default.version
    }),
    // Use provided maxAttempts or load from config
    maxAttempts: userConfig?.maxAttempts ?? Rb.loadConfig(H40.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, userConfig),
    // Use provided region or load from config files and environment
    region: userConfig?.region ?? Rb.loadConfig(bQ1.NODE_REGION_CONFIG_OPTIONS, {
      ...bQ1.NODE_REGION_CONFIG_FILE_OPTIONS,
      ...profileOptions
    }),
    // Use provided request handler or create a default Node HTTP handler
    requestHandler: z40.NodeHttpHandler.create(userConfig?.requestHandler ?? loadConfigsForDefaultMode),
    // Use provided retry mode or load from config, with fallback to default retry mode
    retryMode: userConfig?.retryMode ?? Rb.loadConfig({
      ...H40.NODE_RETRY_MODE_CONFIG_OPTIONS,
      default: async () => {
        const configs = await loadConfigsForDefaultMode();
        return configs.retryMode || initializeSyntaxHighlightingfindInStoreWithCallback.DEFAULT_RETRY_MODE;
      }
    }, userConfig),
    // Use provided sha256 implementation or default
    sha256: userConfig?.sha256 ?? OfindInStoreWithCallback.Hash.bind(null, "sha256"),
    // Use provided stream collector or default
    streamCollector: userConfig?.streamCollector ?? z40.streamCollector,
    // Use provided dualstack endpoint flag or load from config
    useDualstackEndpoint: userConfig?.useDualstackEndpoint ?? Rb.loadConfig(bQ1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, profileOptions),
    // Use provided FIPS endpoint flag or load from config
    useFipsEndpoint: userConfig?.useFipsEndpoint ?? Rb.loadConfig(bQ1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, profileOptions),
    // Use provided user agent app updateSnapshotAndNotify or load from config
    userAgentAppId: userConfig?.userAgentAppId ?? Rb.loadConfig(K40.NODE_APP_ID_CONFIG_OPTIONS, profileOptions)
  };
}

module.exports = { getNodeRuntimeConfig };