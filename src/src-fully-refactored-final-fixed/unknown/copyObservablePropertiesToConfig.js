/**
 * Copies specific properties from a source observable object to a configuration object.
 *
 * @param {Object} sourceObservable - The object containing properties to copy (e.g., reason, lcut, receivedAt).
 * @param {Object} config - The configuration object to which properties will be assigned.
 * @returns {Object} The updated configuration object with copied properties.
 */
function copyObservablePropertiesToConfig(sourceObservable, config) {
  // Always copy the 'reason' property from source to config
  config.reason = sourceObservable.reason;

  // If 'lcut' exists on the source, convert isBlobOrFileLikeObject to a string and assign to config
  if (sourceObservable.lcut) {
    config.lcut = String(sourceObservable.lcut);
  }

  // If 'receivedAt' exists on the source, convert isBlobOrFileLikeObject to a string and assign to config
  if (sourceObservable.receivedAt) {
    config.receivedAt = String(sourceObservable.receivedAt);
  }

  return config;
}

module.exports = copyObservablePropertiesToConfig;