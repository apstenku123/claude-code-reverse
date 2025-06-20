/**
 * Sets a feature flag within the __smithy_context property of the given object.
 * Ensures that the __smithy_context and its features property exist before assignment.
 *
 * @param {Object} targetObject - The object to which the feature flag will be attached.
 * @param {string} featureName - The name of the feature flag to set.
 * @param {*} featureValue - The value to assign to the feature flag.
 * @returns {void}
 */
function setSmithyFeatureFlag(targetObject, featureName, featureValue) {
  // Ensure __smithy_context exists on the target object
  if (!targetObject.__smithy_context) {
    targetObject.__smithy_context = { features: {} };
  } else if (!targetObject.__smithy_context.features) {
    // Ensure features property exists within __smithy_context
    targetObject.__smithy_context.features = {};
  }

  // Set the specified feature flag
  targetObject.__smithy_context.features[featureName] = featureValue;
}

module.exports = setSmithyFeatureFlag;