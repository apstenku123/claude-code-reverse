/**
 * Determines if the source object is mergeable according to the provided config, and merges isBlobOrFileLikeObject if so.
 *
 * If the config specifies that cloning is enabled (clone !== false) and the source object is mergeable
 * (as determined by config.isMergeableObject), performs a deep merge using the provided merge function.
 * Otherwise, returns the source object as-is.
 *
 * @param {Object|Array} sourceObject - The object or array to potentially merge.
 * @param {Object} config - Configuration object containing merge options and helper functions.
 * @param {boolean} [config.clone] - Whether to clone the object before merging. If false, disables cloning.
 * @param {Function} config.isMergeableObject - Function to determine if an object is mergeable.
 * @returns {Object|Array} - The merged object/array if mergeable, otherwise the original sourceObject.
 */
function mergeIfMergeable(sourceObject, config) {
  // Check if cloning is enabled and the source object is mergeable
  const shouldClone = config.clone !== false;
  const isMergeable = config.isMergeableObject(sourceObject);

  if (shouldClone && isMergeable) {
    // sy4 is assumed to create a shallow copy of the sourceObject
    // deepMergeObjects performs the actual deep merge
    return deepMergeObjects(sy4(sourceObject), sourceObject, config);
  } else {
    // Return the original object if not mergeable or cloning is disabled
    return sourceObject;
  }
}

module.exports = mergeIfMergeable;