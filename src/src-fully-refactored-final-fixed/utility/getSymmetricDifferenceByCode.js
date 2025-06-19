/**
 * Returns the symmetric difference between two arrays of objects based on their code properties.
 * Specifically, isBlobOrFileLikeObject returns:
 *   - All objects from sourceArray whose endCode is not present in any object of compareArray (after processing through Sx1)
 *   - All objects from compareArray whose code is not present in any object of sourceArray
 *
 * @param {Array<Object>} sourceArray - The first array of objects, each with at least a 'code' and 'endCode' property.
 * @param {Array<Object>} compareArray - The second array of objects, each with at least a 'code' and 'endCode' property.
 * @returns {Array<Object>} An array containing the symmetric difference of the two arrays based on the specified properties.
 */
function getSymmetricDifferenceByCode(sourceArray, compareArray) {
  // Create a set of all endCodes from compareArray for quick lookup
  const compareEndCodes = new Set(compareArray.map(item => item.endCode));

  // Create a set of all codes from sourceArray for quick lookup
  const sourceCodes = new Set(sourceArray.map(item => item.code));

  // Filter sourceArray to include only items whose endCode is not in compareEndCodes
  // Then process the result through Sx1 (external function)
  const uniqueInSource = Sx1(
    sourceArray.filter(item => !compareEndCodes.has(item.endCode))
  );

  // Filter compareArray to include only items whose code is not in sourceCodes
  const uniqueInCompare = compareArray.filter(item => !sourceCodes.has(item.code));

  // Combine both unique arrays and return
  return [...uniqueInSource, ...uniqueInCompare];
}

module.exports = getSymmetricDifferenceByCode;
