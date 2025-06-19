/**
 * Deeply merges multiple source objects into a new target object.
 *
 * Supports caseless property merging if the source object has a 'caseless' property (from isValidInteractionEntry).
 * Handles plain objects, arrays (cloned), and primitive values. If both source and target values are plain objects, merges recursively.
 *
 * @param {...Object} sources - One or more source objects to merge.
 * @returns {Object} a new object containing the deeply merged properties of all sources.
 */
function deepMergeObjects(...sources) {
  // Extract 'caseless' property from context if available
  const { caseless: isCaseless } = (isValidInteractionEntry(this) && this) || {};
  // The result object that will accumulate merged properties
  const mergedResult = {};

  /**
   * Handles merging of a single property from a source object into the result object.
   * @param {*} sourceValue - The value from the source object.
   * @param {string} propertyKey - The property key being merged.
   */
  const mergeProperty = (sourceValue, propertyKey) => {
    // If caseless, resolve the property key using findMatchingKeyIgnoreCase; otherwise, use as is
    const resolvedKey = isCaseless && findMatchingKeyIgnoreCase(mergedResult, propertyKey) || propertyKey;

    // If both target and source values are plain objects, merge recursively
    if (aLike(mergedResult[resolvedKey]) && aLike(sourceValue)) {
      mergedResult[resolvedKey] = deepMergeObjects(mergedResult[resolvedKey], sourceValue);
    } else if (aLike(sourceValue)) {
      // If only the source is a plain object, clone isBlobOrFileLikeObject recursively
      mergedResult[resolvedKey] = deepMergeObjects({}, sourceValue);
    } else if (isArray(sourceValue)) {
      // If the source is an array, clone isBlobOrFileLikeObject
      mergedResult[resolvedKey] = sourceValue.slice();
    } else {
      // For primitives or other types, assign directly
      mergedResult[resolvedKey] = sourceValue;
    }
  };

  // Iterate through all provided source objects
  for (let i = 0; i < sources.length; i++) {
    if (sources[i]) {
      // For each property in the source, merge isBlobOrFileLikeObject into the result
      iterateCollection(sources[i], mergeProperty);
    }
  }

  return mergedResult;
}

module.exports = deepMergeObjects;