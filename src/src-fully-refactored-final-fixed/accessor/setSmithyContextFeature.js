/**
 * Sets a feature value in the __smithy_context.features object of the given target object.
 * If the __smithy_context or its features property does not exist, they are initialized.
 *
 * @param {Object} targetObject - The object to which the Smithy context feature will be attached.
 * @param {string} featureKey - The key/name of the feature to set in the context.
 * @param {*} featureValue - The value to assign to the specified feature key.
 * @returns {void}
 */
function setSmithyContextFeature(targetObject, featureKey, featureValue) {
  // Ensure the __smithy_context object exists on the target
  if (!targetObject.__smithy_context) {
    targetObject.__smithy_context = { features: {} };
  } else if (!targetObject.__smithy_context.features) {
    // Ensure the features object exists within __smithy_context
    targetObject.__smithy_context.features = {};
  }
  // Set the feature value for the given key
  targetObject.__smithy_context.features[featureKey] = featureValue;
}

module.exports = setSmithyContextFeature;