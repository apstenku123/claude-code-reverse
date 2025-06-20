/**
 * Checks if a specific feature flag or configuration value is enabled (true) on the given observable source.
 *
 * @param {Object} sourceObservable - The object that provides a getValue method to retrieve configuration or state values.
 * @returns {boolean} Returns true if the feature identified by FEATURE_FLAG_KEY is enabled, otherwise false.
 */
const FEATURE_FLAG_KEY = Yv1; // Assumes Yv1 is defined/imported elsewhere as the feature flag key

function isFeatureEnabled(sourceObservable) {
  // Retrieve the value for the feature flag key and check if isBlobOrFileLikeObject is strictly true
  return sourceObservable.getValue(FEATURE_FLAG_KEY) === true;
}

module.exports = isFeatureEnabled;