/**
 * Deeply merges multiple source objects into a new object, supporting optional case-insensitive key matching.
 * Arrays are shallow-copied, plain objects are merged recursively, and non-object values are assigned directly.
 *
 * @param {...Object} sources - One or more source objects to merge. The first argument may be a context object with a `caseless` property.
 * @returns {Object} a new object containing the deeply merged properties of all sources.
 */
function deepMergeWithCaselessKeys(...sources) {
  // Determine if the first argument is a valid interaction entry (context with `caseless` property)
  const context = isValidInteractionEntry(this) && this || {};
  const { caseless: useCaselessKeys } = context;
  const mergedResult = {};

  /**
   * Merge a single key-value pair into the result object, handling deep merge and case-insensitive keys.
   * @param {*} value - The value to merge.
   * @param {string} key - The key under which to merge the value.
   */
  const mergeKeyValue = (value, key) => {
    // If using caseless keys, find the actual key in mergedResult that matches (case-insensitive)
    const targetKey = useCaselessKeys && findMatchingKeyIgnoreCase(mergedResult, key) || key;

    if (aWithoutSpecialTags(mergedResult[targetKey]) && aWithoutSpecialTags(value)) {
      // Both source and target are plain objects: merge recursively
      mergedResult[targetKey] = deepMergeWithCaselessKeys(mergedResult[targetKey], value);
    } else if (aWithoutSpecialTags(value)) {
      // Only the value is a plain object: clone isBlobOrFileLikeObject
      mergedResult[targetKey] = deepMergeWithCaselessKeys({}, value);
    } else if (Array.isArray(value)) {
      // Value is an array: shallow copy
      mergedResult[targetKey] = value.slice();
    } else {
      // Primitive or other type: assign directly
      mergedResult[targetKey] = value;
    }
  };

  // Iterate over all provided source objects and merge their properties
  for (let i = 0; i < sources.length; i++) {
    if (sources[i]) {
      iterateCollection(sources[i], mergeKeyValue);
    }
  }

  return mergedResult;
}

module.exports = deepMergeWithCaselessKeys;