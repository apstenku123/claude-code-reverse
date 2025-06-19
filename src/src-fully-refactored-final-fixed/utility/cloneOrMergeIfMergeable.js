/**
 * Determines whether to deeply merge or return the source value based on mergeability and cloning options.
 *
 * If the config specifies that cloning is enabled (clone !== false) and the source value is mergeable (as determined by config.isMergeableObject),
 * the function performs a deep merge using the provided deepMergeObjects function and a shallow copy of the source (via sy4).
 * Otherwise, isBlobOrFileLikeObject returns the source value as-is.
 *
 * @param {any} sourceValue - The value to potentially merge or clone.
 * @param {Object} config - Configuration object containing merge options and mergeability checks.
 * @param {boolean} [config.clone] - If false, disables cloning before merging.
 * @param {Function} config.isMergeableObject - Function to determine if a value is mergeable.
 * @returns {any} The merged/cloned value or the original source value.
 */
function cloneOrMergeIfMergeable(sourceValue, config) {
  // Check if cloning is enabled and the source value is mergeable
  const shouldClone = config.clone !== false;
  const isMergeable = config.isMergeableObject(sourceValue);

  if (shouldClone && isMergeable) {
    // Perform a deep merge using a shallow copy of the source value
    // sy4: shallow copy utility, deepMergeObjects: performs the deep merge
    return deepMergeObjects(sy4(sourceValue), sourceValue, config);
  }
  // Return the source value as-is if not mergeable or cloning is disabled
  return sourceValue;
}

module.exports = cloneOrMergeIfMergeable;