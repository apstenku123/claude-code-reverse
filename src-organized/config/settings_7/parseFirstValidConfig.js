/**
 * Attempts to parse and return the first valid configuration from a list of configuration candidates.
 * If all candidates fail to parse, optionally returns a default LoadBalancingConfig instance if requested and available.
 *
 * @param {Array<any>} configCandidates - An array of configuration candidate objects to be parsed.
 * @param {boolean} [returnDefaultIfNone=false] - If true, returns a default LoadBalancingConfig instance if all candidates fail and such a config is available.
 * @returns {any|null} The first successfully parsed configuration, a default LoadBalancingConfig instance, or null if none found.
 */
function parseFirstValidConfig(configCandidates, returnDefaultIfNone = false) {
  for (const candidateConfig of configCandidates) {
    try {
      // Attempt to parse the current configuration candidate
      return createLoadBalancingConfigFromJson(candidateConfig);
    } catch (parseError) {
      // Log the parsing error for debugging purposes
      r96.log(
        o96.LogVerbosity.DEBUG,
        "Config parsing failed with error",
        parseError.message
      );
      // Continue to the next candidate
      continue;
    }
  }

  // If no valid configuration was found and the caller requests a default
  if (returnDefaultIfNone) {
    // If a default LoadBalancingConfig is available, return a new instance
    if (Fs) {
      return new uL[Fs].LoadBalancingConfig();
    } else {
      // No default config available
      return null;
    }
  } else {
    // No valid configuration found and no default requested
    return null;
  }
}

module.exports = parseFirstValidConfig;