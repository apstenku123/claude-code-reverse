/**
 * Attempts to parse and return the first valid load balancing configuration from a list of config candidates.
 * If all candidates fail to parse, optionally returns a default config if requested.
 *
 * @param {Array<any>} configCandidates - An array of configuration candidate objects to try parsing.
 * @param {boolean} [returnDefaultIfNone=false] - If true, returns a default LoadBalancingConfig if all candidates fail; otherwise, returns null.
 * @returns {any|null} The first successfully parsed LoadBalancingConfig, a default config, or null if none found.
 */
function getFirstValidLoadBalancingConfig(configCandidates, returnDefaultIfNone = false) {
  for (const candidate of configCandidates) {
    try {
      // Attempt to parse the candidate configuration
      return createLoadBalancingConfigFromJson(candidate);
    } catch (parseError) {
      // Log the parsing error for debugging purposes
      r96.log(o96.LogVerbosity.DEBUG, "Config parsing failed with error", parseError.message);
      continue;
    }
  }

  // If no valid config found, optionally return a default config if requested
  if (returnDefaultIfNone) {
    if (Fs) {
      // Return a new instance of the default LoadBalancingConfig if available
      return new uL[Fs].LoadBalancingConfig();
    } else {
      return null;
    }
  } else {
    return null;
  }
}

module.exports = getFirstValidLoadBalancingConfig;