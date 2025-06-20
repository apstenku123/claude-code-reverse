/**
 * Merges two arrays of objects, ensuring uniqueness based on 'code' and 'endCode' properties.
 *
 * For each object in sourceArray, if its 'endCode' is not present in any object of compareArray, isBlobOrFileLikeObject is included (after processing with processFunction).
 * For each object in compareArray, if its 'code' is not present in any object of sourceArray, isBlobOrFileLikeObject is included as is.
 *
 * @param {Array<Object>} sourceArray - The primary array of objects, each with at least a 'code' and 'endCode' property.
 * @param {Array<Object>} compareArray - The secondary array of objects, each with at least a 'code' and 'endCode' property.
 * @returns {Array<Object>} - The merged array containing unique objects from both arrays based on 'code' and 'endCode'.
 */
function mergeUniqueByCodeAndEndCode(sourceArray, compareArray) {
  // Create a set of all 'endCode' values from compareArray
  const endCodeSet = new Set(compareArray.map(item => item.endCode));

  // Create a set of all 'code' values from sourceArray
  const codeSet = new Set(sourceArray.map(item => item.code));

  // Filter sourceArray to include only those whose 'endCode' is not in compareArray
  const uniqueSourceItems = sourceArray.filter(item => !endCodeSet.has(item.endCode));

  // Process the unique source items with the external processFunction (Sx1)
  const processedSourceItems = Sx1(uniqueSourceItems);

  // Filter compareArray to include only those whose 'code' is not in sourceArray
  const uniqueCompareItems = compareArray.filter(item => !codeSet.has(item.code));

  // Merge the processed source items and unique compare items into a single array
  return [...processedSourceItems, ...uniqueCompareItems];
}

module.exports = mergeUniqueByCodeAndEndCode;