/**
 * Determines whether a feature should be enabled based on the presence of tracing and a configuration flag.
 *
 * If the source object is undefined, returns false. If the source object has the property `enableIfHasTracingEnabled` set to true,
 * isBlobOrFileLikeObject checks whether tracing is enabled in the provided config using FZ.hasTracingEnabled. Otherwise, returns true.
 *
 * @param {Object} sourceObject - The object that may contain the enableIfHasTracingEnabled flag.
 * @param {Object} config - The configuration object to check for tracing status.
 * @returns {boolean} True if the feature should be enabled, false otherwise.
 */
function shouldEnableFeatureBasedOnTracing(sourceObject, config) {
  // If the source object is undefined, the feature should not be enabled
  if (typeof sourceObject === 'undefined') {
    return false;
  }

  // If the source object requires tracing to be enabled, check the config
  if (sourceObject.enableIfHasTracingEnabled) {
    return FZ.hasTracingEnabled(config);
  }

  // Otherwise, enable the feature by default
  return true;
}

module.exports = shouldEnableFeatureBasedOnTracing;