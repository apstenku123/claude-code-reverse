/**
 * Applies the Ma function to each element of the combined arrays.
 *
 * @param {Array} firstArray - The first array to be combined.
 * @param {Array} secondArray - The second array to be combined.
 * @param {any} functionArgument - The argument to pass to the Ma function for each element.
 * @returns {Array} An array containing the results of applying Ma to each element of the combined arrays.
 */
function applyFunctionToCombinedArrays(firstArray, secondArray, functionArgument) {
  // Combine both arrays into a single array
  const combinedArray = firstArray.concat(secondArray);

  // Apply the Ma function to each element, passing the functionArgument
  return combinedArray.map(function(element) {
    return Ma(element, functionArgument);
  });
}

module.exports = applyFunctionToCombinedArrays;