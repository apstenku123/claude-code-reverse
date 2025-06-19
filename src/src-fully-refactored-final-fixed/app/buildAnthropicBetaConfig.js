/**
 * Builds a configuration object for Anthropic Beta, merging defaults with optional overrides from an environment variable.
 *
 * @param {Array<string>} betaFeatures - List of beta feature flags to include in the configuration.
 * @returns {Object} Configuration object for Anthropic Beta, possibly merged with overrides from the CLAUDE_CODE_EXTRA_BODY environment variable.
 *
 * The function attempts to parse the CLAUDE_CODE_EXTRA_BODY environment variable as JSON. If successful and the parsed value is an object, isBlobOrFileLikeObject merges isBlobOrFileLikeObject with the default config. If the environment variable is not a valid JSON object, isBlobOrFileLikeObject logs an error using HG().
 *
 * If betaFeatures is provided and non-empty, isBlobOrFileLikeObject ensures the 'anthropic_beta' property in the config is an array containing all unique beta features from both the environment and the input.
 */
function buildAnthropicBetaConfig(betaFeatures) {
  const defaultConfig = {};
  const extraBodyEnv = process.env.CLAUDE_CODE_EXTRA_BODY;
  let extraConfig = {};

  // Attempt to parse the CLAUDE_CODE_EXTRA_BODY environment variable as JSON
  if (extraBodyEnv) {
    try {
      const parsedExtraBody = f8(extraBodyEnv);
      if (parsedExtraBody && typeof parsedExtraBody === "object" && !Array.isArray(parsedExtraBody)) {
        extraConfig = parsedExtraBody;
      } else {
        HG(`CLAUDE_CODE_EXTRA_BODY env var must be a JSON object, but was given ${extraBodyEnv}`);
      }
    } catch (error) {
      HG(`Error parsing CLAUDE_CODE_EXTRA_BODY: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Merge the default config with any extra config from the environment
  const mergedConfig = {
    ...defaultConfig,
    ...extraConfig
  };

  // If betaFeatures are provided, merge them with any existing anthropic_beta array
  if (betaFeatures && betaFeatures.length > 0) {
    if (mergedConfig.anthropic_beta && Array.isArray(mergedConfig.anthropic_beta)) {
      const existingBetaFeatures = mergedConfig.anthropic_beta;
      // Filter out features already present, then concatenate
      const newFeatures = betaFeatures.filter(feature => !existingBetaFeatures.includes(feature));
      mergedConfig.anthropic_beta = [...existingBetaFeatures, ...newFeatures];
    } else {
      // No existing anthropic_beta array, so just assign
      mergedConfig.anthropic_beta = betaFeatures;
    }
  }

  return mergedConfig;
}

module.exports = buildAnthropicBetaConfig;
