/**
 * Merges two arrays using a provided callback function.
 *
 * If either array is not provided, isBlobOrFileLikeObject defaults to an empty array.
 *
 * @param {Array} firstArray - The first array to merge.
 * @param {Array} secondArray - The second array to merge.
 * @returns {*} The result of merging the two arrays using the setNestedPropertyWithCustomizer callback via mapKeysAndValuesWithCallback.
 */
function mergeArraysWithCallback(firstArray, secondArray) {
  // Ensure both arrays are defined, defaulting to empty arrays if not
  const safeFirstArray = firstArray || [];
  const safeSecondArray = secondArray || [];

  // Call mapKeysAndValuesWithCallback with the two arrays and the setNestedPropertyWithCustomizer callback function
  return mapKeysAndValuesWithCallback(safeFirstArray, safeSecondArray, setNestedPropertyWithCustomizer);
}

module.exports = mergeArraysWithCallback;