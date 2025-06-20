/**
 * Combines two arrays and applies a mapping function to each element using the provided context.
 *
 * @param {Array<any>} firstArray - The first array to combine.
 * @param {Array<any>} secondArray - The second array to combine.
 * @param {any} mappingContext - The context or additional parameter to be passed to the mapping function.
 * @returns {Array<any>} a new array containing the results of applying the mapping function to each element of the combined array.
 */
function mapCombinedArraysWithFunction(firstArray, secondArray, mappingContext) {
  // Combine both arrays into a single array
  const combinedArray = firstArray.concat(secondArray);

  // Map each element of the combined array using the external Ma function and the provided context
  return combinedArray.map(function(element) {
    return Ma(element, mappingContext);
  });
}

module.exports = mapCombinedArraysWithFunction;