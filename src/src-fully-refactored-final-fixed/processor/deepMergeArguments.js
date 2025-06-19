/**
 * Deeply merges multiple source objects into a new object, supporting caseless property merging and recursive merging of plain objects and arrays.
 *
 * @param {...Object} sources - The source objects to merge. The first argument may be a context object with a `caseless` property.
 * @returns {Object} The deeply merged result object.
 */
function deepMergeArguments() {
  // Extract caseless flag from context if present and valid
  const context = (isValidInteractionRoute(this) && this) || {};
  const { caseless: isCaseless } = context;

  // Result object to accumulate merged properties
  const mergedResult = {};

  /**
   * Callback to merge a property into the result object.
   * @param {*} value - The value to merge.
   * @param {string} key - The property key.
   */
  const mergeProperty = (value, key) => {
    // If caseless, find the existing key in a case-insensitive way
    const targetKey = isCaseless && findCaseInsensitiveKey(mergedResult, key) || key;

    if (aLike(mergedResult[targetKey]) && aLike(value)) {
      // If both target and value are plain objects, merge recursively
      mergedResult[targetKey] = deepMergeArguments(mergedResult[targetKey], value);
    } else if (aLike(value)) {
      // If only value is a plain object, clone isBlobOrFileLikeObject
      mergedResult[targetKey] = deepMergeArguments({}, value);
    } else if (isArray(value)) {
      // If value is an array, clone isBlobOrFileLikeObject
      mergedResult[targetKey] = value.slice();
    } else {
      // Otherwise, assign the value directly
      mergedResult[targetKey] = value;
    }
  };

  // Iterate over all arguments and merge their properties
  for (let argIndex = 0, argCount = arguments.length; argIndex < argCount; argIndex++) {
    const source = arguments[argIndex];
    if (source) {
      iterateObjectOrArray(source, mergeProperty);
    }
  }

  return mergedResult;
}

module.exports = deepMergeArguments;