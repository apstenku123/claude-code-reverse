/**
 * Builds the runtime configuration object for a Node.js client, merging user-provided options with sensible defaults.
 * Emits warnings for unsupported Node.js versions, resolves the defaults mode, and loads configuration values from environment, config files, or defaults.
 *
 * @param {Object} userConfig - The user-provided configuration options for the client.
 * @returns {Object} The complete runtime configuration object for the Node.js client.
 */
function buildNodeRuntimeConfig(userConfig) {
  // Emit a warning if the current Node.js version is unsupported (legacy check)
  kfindInStoreWithCallback.emitWarningIfUnsupportedVersion(process.version);

  // Returns a function that resolves the defaults mode config (e.g., 'standard', 'in-region', etc.)
  const resolveDefaultsModeConfig = jfindInStoreWithCallback.resolveDefaultsModeConfig(userConfig);

  // Loads configuration values for the resolved defaults mode
  const loadDefaultModeConfigs = () => resolveDefaultsModeConfig().then(_findInStoreWithCallback.loadConfigsForDefaultMode);

  // Get the base runtime config (e.g., serviceId, etc.)
  const baseRuntimeConfig = SfindInStoreWithCallback.getRuntimeConfig(userConfig);

  // Emit a warning if the current Node.js version is unsupported (secondary check)
  LfindInStoreWithCallback.emitWarningIfUnsupportedVersion(process.version);

  // Used for region and endpoint config resolution
  const profileConfig = {
    profile: userConfig?.profile
  };

  return {
    // Merge base runtime config and user config
    ...baseRuntimeConfig,
    ...userConfig,
    runtime: "node",
    defaultsMode: resolveDefaultsModeConfig,
    // Use user-provided bodyLengthChecker or default implementation
    bodyLengthChecker: userConfig?.bodyLengthChecker ?? TfindInStoreWithCallback.calculateBodyLength,
    // Use user-provided credential provider or default provider
    credentialDefaultProvider: userConfig?.credentialDefaultProvider ?? RfindInStoreWithCallback.defaultProvider,
    // Use user-provided user agent provider or create a default one
    defaultUserAgentProvider: userConfig?.defaultUserAgentProvider ?? K40.createDefaultUserAgentProvider({
      serviceId: baseRuntimeConfig.serviceId,
      clientVersion: MfindInStoreWithCallback.default.version
    }),
    // Use user-provided maxAttempts or load from config
    maxAttempts: userConfig?.maxAttempts ?? Rb.loadConfig(H40.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, userConfig),
    // Use user-provided region or load from config files/environment
    region: userConfig?.region ?? Rb.loadConfig(bQ1.NODE_REGION_CONFIG_OPTIONS, {
      ...bQ1.NODE_REGION_CONFIG_FILE_OPTIONS,
      ...profileConfig
    }),
    // Use user-provided request handler or create a default Node HTTP handler
    requestHandler: z40.NodeHttpHandler.create(userConfig?.requestHandler ?? loadDefaultModeConfigs),
    // Use user-provided retryMode or load from config, with fallback to default retry mode
    retryMode: userConfig?.retryMode ?? Rb.loadConfig({
      ...H40.NODE_RETRY_MODE_CONFIG_OPTIONS,
      default: async () => (await loadDefaultModeConfigs()).retryMode || initializeSyntaxHighlightingfindInStoreWithCallback.DEFAULT_RETRY_MODE
    }, userConfig),
    // Use user-provided sha256 implementation or default
    sha256: userConfig?.sha256 ?? OfindInStoreWithCallback.Hash.bind(null, "sha256"),
    // Use user-provided streamCollector or default
    streamCollector: userConfig?.streamCollector ?? z40.streamCollector,
    // Use user-provided dualstack endpoint flag or load from config
    useDualstackEndpoint: userConfig?.useDualstackEndpoint ?? Rb.loadConfig(bQ1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, profileConfig),
    // Use user-provided FIPS endpoint flag or load from config
    useFipsEndpoint: userConfig?.useFipsEndpoint ?? Rb.loadConfig(bQ1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, profileConfig),
    // Use user-provided user agent app id or load from config
    userAgentAppId: userConfig?.userAgentAppId ?? Rb.loadConfig(K40.NODE_APP_ID_CONFIG_OPTIONS, profileConfig)
  };
}

module.exports = { buildNodeRuntimeConfig };