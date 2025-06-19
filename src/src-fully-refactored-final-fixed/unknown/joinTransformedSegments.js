/**
 * Joins two arrays, transforms each element, and joins them into a string with a configurable separator and formatting.
 *
 * @param {Array} primarySegments - The primary array of segments to join and transform. If falsy, the fallbackSegments are returned as-is.
 * @param {Array} fallbackSegments - The fallback array of segments, used if primarySegments is falsy.
 * @param {boolean} useDotSeparator - If true, segments are joined with a dot ('.'); otherwise, they are joined without a separator. Also affects formatting of non-initial segments.
 * @returns {string} The joined and transformed string representation of the segments.
 */
function joinTransformedSegments(primarySegments, fallbackSegments, useDotSeparator) {
  // If no primary segments, return fallback segments as-is
  if (!primarySegments) return fallbackSegments;

  // Concatenate the two arrays and transform each segment
  const allSegments = primarySegments.concat(fallbackSegments);

  const transformedSegments = allSegments.map(function transformSegment(segment, index) {
    // Apply external transformation function to each segment
    const transformed = removeArraySuffix(segment);
    // If not using dot separator and not the first segment, wrap in brackets
    if (!useDotSeparator && index) {
      return `[${transformed}]`;
    }
    return transformed;
  });

  // Join segments with appropriate separator
  return transformedSegments.join(useDotSeparator ? '.' : '');
}

module.exports = joinTransformedSegments;