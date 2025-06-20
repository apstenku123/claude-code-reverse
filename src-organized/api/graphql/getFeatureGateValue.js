/**
 * Determines the value to return based on a feature gate'createInteractionAccessor status.
 *
 * @param {Object} featureGateProvider - An object that provides feature gate values via getFeatureGate().
 * @param {Object} gateConfig - Configuration object containing gate_name, pass_value, and fail_value.
 * @param {any} subscriptionContext - Context or subscription used to determine feature gate evaluation.
 * @returns {any} Returns pass_value if the feature gate is enabled, otherwise fail_value.
 */
function getFeatureGateValue(featureGateProvider, gateConfig, subscriptionContext) {
  // Determine the context for getFeatureGate: if isExposureLoggingDisabled(subscriptionContext) is true, use undefined; otherwise use H61
  const context = isExposureLoggingDisabled(subscriptionContext) ? undefined : H61;

  // Retrieve the feature gate value
  const featureGate = featureGateProvider.getFeatureGate(gateConfig.gate_name, context);

  // Return pass_value if the feature gate is enabled, otherwise fail_value
  if (featureGate.value) {
    return gateConfig.pass_value;
  }
  return gateConfig.fail_value;
}

module.exports = getFeatureGateValue;