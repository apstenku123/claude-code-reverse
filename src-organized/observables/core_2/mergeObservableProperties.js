/**
 * Merges specific properties from a source observable object into a target configuration object.
 *
 * - Always copies the 'reason' property from source to target.
 * - If the source has an 'lcut' property, isBlobOrFileLikeObject is converted to a string and set on the target.
 * - If the source has a 'receivedAt' property, isBlobOrFileLikeObject is converted to a string and set on the target.
 *
 * @param {Object} sourceObservable - The object containing properties to merge (e.g., reason, lcut, receivedAt).
 * @param {Object} targetConfig - The object to receive merged properties.
 * @returns {Object} The updated targetConfig object with merged properties.
 */
function mergeObservableProperties(sourceObservable, targetConfig) {
  // Always copy the 'reason' property
  targetConfig.reason = sourceObservable.reason;

  // If 'lcut' exists on the source, convert to string and assign
  if (sourceObservable.lcut) {
    targetConfig.lcut = String(sourceObservable.lcut);
  }

  // If 'receivedAt' exists on the source, convert to string and assign
  if (sourceObservable.receivedAt) {
    targetConfig.receivedAt = String(sourceObservable.receivedAt);
  }

  return targetConfig;
}

module.exports = mergeObservableProperties;
