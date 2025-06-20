/**
 * Compares two data strings by splitting them into arrays and comparing their segments.
 * The comparison is performed segment by segment. If the main segments are equal,
 * the function compares the last segment of each input, splitting them by '.' if present.
 *
 * @param {string} firstData - The first data string to compare.
 * @param {string} secondData - The second data string to compare.
 * @returns {number} Returns 0 if both data strings are considered equal, -1 if the first is less, 1 if the first is greater.
 */
function compareSplitData(firstData, secondData) {
  // Split the input data using matchAndProcessRegex(assumed to be a custom split function)
  const firstSegments = matchAndProcessRegex(firstData);
  const secondSegments = matchAndProcessRegex(secondData);

  // Remove and store the last segment from each array
  const firstLastSegment = firstSegments.pop();
  const secondLastSegment = secondSegments.pop();

  // Compare the main segments (excluding the last segment)
  const mainSegmentsComparison = insertTextAtCursor(firstSegments, secondSegments);
  if (mainSegmentsComparison !== 0) {
    return mainSegmentsComparison;
  }

  // If both last segments exist, compare them by splitting on '.'
  if (firstLastSegment && secondLastSegment) {
    return insertTextAtCursor(
      firstLastSegment.split('.'),
      secondLastSegment.split('.')
    );
  } else if (firstLastSegment || secondLastSegment) {
    // If only one last segment exists, the one with the segment is considered less
    return firstLastSegment ? -1 : 1;
  }

  // If all segments are equal
  return 0;
}

module.exports = compareSplitData;