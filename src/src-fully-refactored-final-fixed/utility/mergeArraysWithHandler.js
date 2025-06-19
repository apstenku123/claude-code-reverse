/**
 * Merges two arrays using a custom handler function.
 *
 * This utility function takes two arrays (or empty arrays if not provided) and merges them
 * using the provided handler function (setNestedPropertyWithCustomizer) via the mapKeysAndValuesWithCallback function.
 *
 * @param {Array} firstArray - The first array to merge. Defaults to an empty array if not provided.
 * @param {Array} secondArray - The second array to merge. Defaults to an empty array if not provided.
 * @returns {*} The result of merging the two arrays using the mapKeysAndValuesWithCallback function and setNestedPropertyWithCustomizer handler.
 */
function mergeArraysWithHandler(firstArray, secondArray) {
  // Ensure both parameters are arrays; default to empty arrays if undefined/null
  const safeFirstArray = firstArray || [];
  const safeSecondArray = secondArray || [];

  // Delegate merging logic to mapKeysAndValuesWithCallback with the handler function setNestedPropertyWithCustomizer
  return mapKeysAndValuesWithCallback(safeFirstArray, safeSecondArray, setNestedPropertyWithCustomizer);
}

module.exports = mergeArraysWithHandler;