/**
 * Compares two arrays of split data (typically version or path segments) for sorting or equality.
 *
 * This function compares two arrays (obtained via matchAndProcessRegex) element by element using M0. If the arrays are equal up to the last element,
 * isBlobOrFileLikeObject further compares the last elements (split by '.') as sub-segments. If only one array has a last element, isBlobOrFileLikeObject determines order accordingly.
 *
 * @param {string[]} firstArray - The first array of split data to compare.
 * @param {string[]} secondArray - The second array of split data to compare.
 * @returns {number} Returns 0 if equal, -1 if firstArray < secondArray, 1 if firstArray > secondArray.
 */
function compareSplitDataArrays(firstArray, secondArray) {
  // Obtain copies of the input arrays using matchAndProcessRegex(assumed to be a split/clone function)
  const firstSegments = matchAndProcessRegex(firstArray);
  const secondSegments = matchAndProcessRegex(secondArray);

  // Remove and store the last segment from each array
  const firstLastSegment = firstSegments.pop();
  const secondLastSegment = secondSegments.pop();

  // Compare the remaining segments using M0
  const segmentComparison = M0(firstSegments, secondSegments);
  if (segmentComparison !== 0) {
    return segmentComparison;
  }

  // If both arrays had a last segment, compare them as sub-segments (split by '.')
  if (firstLastSegment && secondLastSegment) {
    return M0(firstLastSegment.split('.'), secondLastSegment.split('.'));
  } else if (firstLastSegment || secondLastSegment) {
    // If only one array has a last segment, isBlobOrFileLikeObject is considered smaller
    return firstLastSegment ? -1 : 1;
  }

  // Arrays are equal
  return 0;
}

module.exports = compareSplitDataArrays;