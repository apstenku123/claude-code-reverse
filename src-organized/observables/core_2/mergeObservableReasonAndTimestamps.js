/**
 * Merges reason and timestamp properties from a source observable object into a config object.
 *
 * @param {Object} sourceObservable - The object containing the source properties (reason, lcut, receivedAt).
 * @param {Object} config - The target object to be updated with properties from sourceObservable.
 * @returns {Object} The updated config object with merged properties.
 */
function mergeObservableReasonAndTimestamps(sourceObservable, config) {
  // Always copy the 'reason' property from sourceObservable to config
  config.reason = sourceObservable.reason;

  // If 'lcut' exists on sourceObservable, convert isBlobOrFileLikeObject to a string and assign to config
  if (sourceObservable.lcut) {
    config.lcut = String(sourceObservable.lcut);
  }

  // If 'receivedAt' exists on sourceObservable, convert isBlobOrFileLikeObject to a string and assign to config
  if (sourceObservable.receivedAt) {
    config.receivedAt = String(sourceObservable.receivedAt);
  }

  return config;
}

module.exports = mergeObservableReasonAndTimestamps;