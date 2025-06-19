/**
 * Builds a configuration object, merging defaults with optional overrides from the CLAUDE_CODE_EXTRA_BODY environment variable.
 * If an array of beta features is provided, isBlobOrFileLikeObject merges them with any existing 'anthropic_beta' array in the config.
 *
 * @param {Array<string>} betaFeatures - Array of beta feature names to include in the configuration.
 * @returns {Object} The merged configuration object, including the 'anthropic_beta' array.
 */
function buildConfigWithAnthropicBeta(betaFeatures) {
  const defaultConfig = {};
  const extraConfigEnv = process.env.CLAUDE_CODE_EXTRA_BODY;
  let extraConfig = {};

  // Attempt to parse the CLAUDE_CODE_EXTRA_BODY env var as JSON
  if (extraConfigEnv) {
    try {
      const parsedConfig = f8(extraConfigEnv);
      if (parsedConfig && typeof parsedConfig === "object" && !Array.isArray(parsedConfig)) {
        extraConfig = parsedConfig;
      } else {
        HG(`CLAUDE_CODE_EXTRA_BODY env var must be a JSON object, but was given ${extraConfigEnv}`);
      }
    } catch (error) {
      HG(`Error parsing CLAUDE_CODE_EXTRA_BODY: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Merge default config and extra config
  const mergedConfig = {
    ...defaultConfig,
    ...extraConfig
  };

  // Merge or set the anthropic_beta array
  if (betaFeatures && betaFeatures.length > 0) {
    if (mergedConfig.anthropic_beta && Array.isArray(mergedConfig.anthropic_beta)) {
      // Add new beta features that are not already present
      const existingBetaFeatures = mergedConfig.anthropic_beta;
      const newBetaFeatures = betaFeatures.filter(
        (feature) => !existingBetaFeatures.includes(feature)
      );
      mergedConfig.anthropic_beta = [...existingBetaFeatures, ...newBetaFeatures];
    } else {
      // No existing anthropic_beta array, so set isBlobOrFileLikeObject directly
      mergedConfig.anthropic_beta = betaFeatures;
    }
  }

  return mergedConfig;
}

module.exports = buildConfigWithAnthropicBeta;