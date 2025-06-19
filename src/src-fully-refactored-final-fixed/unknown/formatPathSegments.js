/**
 * Formats and joins path segments into a string, with optional bracket or dot notation.
 *
 * @param {Array<string>} pathSegments - An array of path segments to be joined.
 * @param {Array<string>} additionalSegments - Additional path segments to append and join.
 * @param {boolean} useDotNotation - If true, joins segments with dots; otherwise, uses bracket notation for subsequent segments.
 * @returns {string} The formatted path string.
 */
function formatPathSegments(pathSegments, additionalSegments, useDotNotation) {
  // If no path segments are provided, return the additional segments as is
  if (!pathSegments) return additionalSegments;

  // Concatenate the two arrays of segments
  const allSegments = pathSegments.concat(additionalSegments);

  // Map each segment to its formatted representation
  const formattedSegments = allSegments.map((segment, index) => {
    // Apply removeArraySuffix transformation to each segment
    const formattedSegment = removeArraySuffix(segment);
    // If not using dot notation and this is not the first segment, wrap in brackets
    if (!useDotNotation && index) {
      return `[${formattedSegment}]`;
    }
    return formattedSegment;
  });

  // Join segments with dot or without separator based on useDotNotation
  return formattedSegments.join(useDotNotation ? '.' : '');
}

module.exports = formatPathSegments;