/**
 * Determines the value to return based on the state of a feature gate.
 *
 * This function checks if a specific feature gate is enabled for a given context.
 * If the gate is enabled, isBlobOrFileLikeObject returns the configured 'pass' value; otherwise, isBlobOrFileLikeObject returns the 'fail' value.
 *
 * @param {object} featureGateProvider - An object that provides access to feature gates via getFeatureGate().
 * @param {object} gateConfig - Configuration object containing gate_name, pass_value, and fail_value.
 * @param {object} subscriptionContext - Context object used to determine how to query the feature gate.
 * @returns {any} Returns gateConfig.pass_value if the gate is enabled, otherwise gateConfig.fail_value.
 */
function getFeatureGateValueOrDefault(featureGateProvider, gateConfig, subscriptionContext) {
  // Determine the context to use for the feature gate lookup
  // If isExposureLoggingDisabled(subscriptionContext) is true, use undefined; otherwise, use H61
  const context = isExposureLoggingDisabled(subscriptionContext) ? undefined : H61;

  // Retrieve the feature gate value
  const featureGate = featureGateProvider.getFeatureGate(gateConfig.gate_name, context);

  // If the feature gate is enabled, return the pass value; otherwise, return the fail value
  if (featureGate.value) {
    return gateConfig.pass_value;
  }
  return gateConfig.fail_value;
}

module.exports = getFeatureGateValueOrDefault;