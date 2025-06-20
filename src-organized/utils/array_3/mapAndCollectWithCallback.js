/**
 * Applies a callback function to each item in a traversed data structure and collects the results.
 *
 * @param {any} sourceData - The data structure to traverse (e.g., an object or array). If null or undefined, returns as is.
 * @param {Function} itemCallback - The callback function to apply to each traversed item. Receives (item, index) as arguments.
 * @param {any} callbackContext - The context (`this` value) for the callback function.
 * @returns {Array<any>|null|undefined} An array of results from the callback for each traversed item, or the original value if null/undefined.
 */
function mapAndCollectWithCallback(sourceData, itemCallback, callbackContext) {
  // Return early if sourceData is null or undefined
  if (sourceData == null) return sourceData;

  const results = [];
  let index = 0;

  // Traverse sourceData using traverseReactChildren, applying itemCallback to each item
  // traverseReactChildren is assumed to recursively traverse the data structure and invoke the callback for each item
  traverseReactChildren(
    sourceData,
    results,
    "", // Unused parameter, possibly for path tracking
    "", // Unused parameter, possibly for parent key
    function (item) {
      // Call the provided callback with the correct context and incrementing index
      return itemCallback.call(callbackContext, item, index++);
    }
  );

  return results;
}

module.exports = mapAndCollectWithCallback;