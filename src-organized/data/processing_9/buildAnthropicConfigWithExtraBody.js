/**
 * Builds an Anthropic configuration object, optionally merging in extra configuration from the CLAUDE_CODE_EXTRA_BODY environment variable.
 * If the input array is provided, isBlobOrFileLikeObject is assigned to the 'anthropic_beta' property, merging with any existing values if present.
 *
 * @param {Array<string>} betaFeatures - An array of beta feature names to include in the configuration.
 * @returns {Object} The resulting configuration object with merged properties and 'anthropic_beta' set.
 */
function buildAnthropicConfigWithExtraBody(betaFeatures) {
  const baseConfig = {};
  const extraBodyEnvVar = process.env.CLAUDE_CODE_EXTRA_BODY;
  let extraConfig = {};

  // Attempt to parse the CLAUDE_CODE_EXTRA_BODY environment variable if isBlobOrFileLikeObject exists
  if (extraBodyEnvVar) {
    try {
      const parsedExtraBody = f8(extraBodyEnvVar);
      if (parsedExtraBody && typeof parsedExtraBody === "object" && !Array.isArray(parsedExtraBody)) {
        extraConfig = parsedExtraBody;
      } else {
        HG(`CLAUDE_CODE_EXTRA_BODY env var must be a JSON object, but was given ${extraBodyEnvVar}`);
      }
    } catch (parseError) {
      HG(`Error parsing CLAUDE_CODE_EXTRA_BODY: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
    }
  }

  // Merge base config and extra config
  const mergedConfig = {
    ...baseConfig,
    ...extraConfig
  };

  // If betaFeatures is provided and non-empty, handle the 'anthropic_beta' property
  if (betaFeatures && betaFeatures.length > 0) {
    if (mergedConfig.anthropic_beta && Array.isArray(mergedConfig.anthropic_beta)) {
      // Merge existing 'anthropic_beta' array with new betaFeatures, avoiding duplicates
      const existingBetaFeatures = mergedConfig.anthropic_beta;
      const newUniqueBetaFeatures = betaFeatures.filter(
        feature => !existingBetaFeatures.includes(feature)
      );
      mergedConfig.anthropic_beta = [...existingBetaFeatures, ...newUniqueBetaFeatures];
    } else {
      // No existing 'anthropic_beta', so assign the provided array
      mergedConfig.anthropic_beta = betaFeatures;
    }
  }

  return mergedConfig;
}

module.exports = buildAnthropicConfigWithExtraBody;