/**
 * Sets a feature flag or value on the __smithy_context.features object of the given target object.
 * Ensures that the __smithy_context and its features property exist before assignment.
 *
 * @param {Object} targetObject - The object to which the smithy context and feature will be attached.
 * @param {string} featureKey - The key/name of the feature to set.
 * @param {*} featureValue - The value to assign to the specified feature key.
 */
function setSmithyFeature(targetObject, featureKey, featureValue) {
  // Ensure the __smithy_context object exists on the target
  if (!targetObject.__smithy_context) {
    targetObject.__smithy_context = {
      features: {}
    };
  } else if (!targetObject.__smithy_context.features) {
    // Ensure the features object exists within __smithy_context
    targetObject.__smithy_context.features = {};
  }
  // Set the feature value for the given key
  targetObject.__smithy_context.features[featureKey] = featureValue;
}

module.exports = setSmithyFeature;