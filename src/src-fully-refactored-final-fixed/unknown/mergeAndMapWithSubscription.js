/**
 * Merges two arrays and applies a mapping function to each element with a subscription parameter.
 *
 * @param {Array<any>} firstArray - The first array to merge.
 * @param {Array<any>} secondArray - The second array to merge.
 * @param {any} subscription - The subscription or context to pass to the mapping function.
 * @returns {Array<any>} The resulting array after merging and mapping.
 */
function mergeAndMapWithSubscription(firstArray, secondArray, subscription) {
  // Merge both arrays into one
  const mergedArray = firstArray.concat(secondArray);

  // Map each element using the external Ma function with the subscription
  return mergedArray.map(function(element) {
    return Ma(element, subscription);
  });
}

module.exports = mergeAndMapWithSubscription;