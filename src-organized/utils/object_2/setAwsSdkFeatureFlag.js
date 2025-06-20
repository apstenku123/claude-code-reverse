/**
 * Sets a feature flag value within the __aws_sdk_context.features object of the given target object.
 * If the __aws_sdk_context or its features property does not exist, they are initialized.
 *
 * @param {Object} targetObject - The object to which the AWS SDK context will be attached.
 * @param {string} featureName - The name of the feature flag to set.
 * @param {*} featureValue - The value to assign to the feature flag.
 * @returns {void}
 */
function setAwsSdkFeatureFlag(targetObject, featureName, featureValue) {
  // Initialize __aws_sdk_context if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
  if (!targetObject.__aws_sdk_context) {
    targetObject.__aws_sdk_context = { features: {} };
  } else if (!targetObject.__aws_sdk_context.features) {
    // Initialize features object if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
    targetObject.__aws_sdk_context.features = {};
  }
  // Set the feature flag value
  targetObject.__aws_sdk_context.features[featureName] = featureValue;
}

module.exports = setAwsSdkFeatureFlag;