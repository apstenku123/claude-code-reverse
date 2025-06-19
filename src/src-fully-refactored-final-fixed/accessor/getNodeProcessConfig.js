/**
 * Generates and returns the runtime configuration for a Node.js process, merging user-provided options
 * with sensible defaults and environment-based settings. Emits warnings for unsupported Node.js versions.
 *
 * @param {Object} userConfig - User-supplied configuration options for the process.
 * @returns {Object} The complete runtime configuration object for the Node.js process.
 */
function getNodeProcessConfig(userConfig) {
  // Emit a warning if the current Node.js version is unsupported (legacy check)
  GC4.emitWarningIfUnsupportedVersion(process.version);

  // Resolve the defaults mode configuration based on user input
  const resolveDefaultsModeConfig = IC4.resolveDefaultsModeConfig(userConfig);

  // Loads configuration for the resolved defaults mode
  const loadConfigForDefaultsMode = () => resolveDefaultsModeConfig().then(QC4.loadConfigsForDefaultMode);

  // Get the base runtime configuration (e.g., serviceId, etc.)
  const baseRuntimeConfig = BC4.getRuntimeConfig(userConfig);

  // Emit a warning if the current Node.js version is unsupported (secondary check)
  oX4.emitWarningIfUnsupportedVersion(process.version);

  // Prepare profile information for region and endpoint config loading
  const profileConfig = {
    profile: userConfig?.profile
  };

  return {
    // Merge base runtime config and user config
    ...baseRuntimeConfig,
    ...userConfig,
    runtime: "node",
    defaultsMode: resolveDefaultsModeConfig,
    // Use custom bodyLengthChecker if provided, otherwise use default
    bodyLengthChecker: userConfig?.bodyLengthChecker ?? eX4.calculateBodyLength,
    // Use custom user agent provider if provided, otherwise create default
    defaultUserAgentProvider: userConfig?.defaultUserAgentProvider ?? TtA.createDefaultUserAgentProvider({
      serviceId: baseRuntimeConfig.serviceId,
      clientVersion: rX4.default.version
    }),
    // Use custom maxAttempts if provided, otherwise load from config
    maxAttempts: userConfig?.maxAttempts ?? tv.loadConfig(PtA.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, userConfig),
    // Use custom region if provided, otherwise load from config files and profile
    region: userConfig?.region ?? tv.loadConfig(o31.NODE_REGION_CONFIG_OPTIONS, {
      ...o31.NODE_REGION_CONFIG_FILE_OPTIONS,
      ...profileConfig
    }),
    // Use custom request handler if provided, otherwise create a NodeHttpHandler with loaded config
    requestHandler: StA.NodeHttpHandler.create(userConfig?.requestHandler ?? loadConfigForDefaultsMode),
    // Use custom retryMode if provided, otherwise load from config with fallback to default
    retryMode: userConfig?.retryMode ?? tv.loadConfig({
      ...PtA.NODE_RETRY_MODE_CONFIG_OPTIONS,
      default: async () => {
        const loadedConfig = await loadConfigForDefaultsMode();
        return loadedConfig.retryMode || AC4.DEFAULT_RETRY_MODE;
      }
    }, userConfig),
    // Use custom sha256 implementation if provided, otherwise bind default
    sha256: userConfig?.sha256 ?? tX4.Hash.bind(null, "sha256"),
    // Use custom streamCollector if provided, otherwise use default
    streamCollector: userConfig?.streamCollector ?? StA.streamCollector,
    // Use custom dualstack endpoint setting if provided, otherwise load from config
    useDualstackEndpoint: userConfig?.useDualstackEndpoint ?? tv.loadConfig(o31.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, profileConfig),
    // Use custom FIPS endpoint setting if provided, otherwise load from config
    useFipsEndpoint: userConfig?.useFipsEndpoint ?? tv.loadConfig(o31.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, profileConfig),
    // Use custom user agent app updateSnapshotAndNotify if provided, otherwise load from config
    userAgentAppId: userConfig?.userAgentAppId ?? tv.loadConfig(TtA.NODE_APP_ID_CONFIG_OPTIONS, profileConfig)
  };
}

module.exports = { getNodeProcessConfig };