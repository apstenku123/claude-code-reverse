/**
 * Transforms the input data using the M7 function, then shuffles the resulting array in place
 * using the Fisher-Yates algorithm (via shuffleArrayInPlace), and returns the shuffled array.
 *
 * @param {any} inputData - The data to be transformed and shuffled. The type depends on M7'createInteractionAccessor requirements.
 * @returns {any[]} The transformed and shuffled array.
 */
function getShuffledTransformedArray(inputData) {
  // Transform the input data using the external M7 function
  const transformedArray = M7(inputData);

  // Shuffle the transformed array in place using the Fisher-Yates algorithm
  // via the shuffleArrayInPlace function (aliased as shuffleArrayInPlace)
  const shuffledArray = shuffleArrayInPlace(transformedArray);

  return shuffledArray;
}

module.exports = getShuffledTransformedArray;