/**
 * Formats and joins route path segments into a string representation.
 *
 * If the primarySegments array is empty or falsy, returns fallbackSegments as-is.
 * Otherwise, concatenates primarySegments and fallbackSegments, transforms each segment
 * using the provided transformSegment function, and joins them into a string.
 *
 * If useDotSeparator is true, segments are joined with a dot ('.').
 * If useDotSeparator is false, segments are joined without a separator, and all but the first segment
 * are wrapped in square brackets (e.g., [segment]).
 *
 * @param {Array<any>} primarySegments - The main array of route path segments to format.
 * @param {Array<any>} fallbackSegments - Fallback segments to use if primarySegments is empty, or to append otherwise.
 * @param {boolean} useDotSeparator - Determines the join separator and bracket formatting.
 * @param {function(any): string} transformSegment - Function to transform each segment to a string.
 * @returns {string} The formatted route path string.
 */
function formatRoutePathSegments(primarySegments, fallbackSegments, useDotSeparator, transformSegment) {
  // If no primary segments, return fallback segments as-is (joined if array)
  if (!primarySegments) return fallbackSegments;

  // Concatenate primary and fallback segments
  const allSegments = primarySegments.concat(fallbackSegments);

  // Map each segment to its string representation
  const formattedSegments = allSegments.map((segment, index) => {
    const transformed = transformSegment(segment);
    // If not using dot separator and not the first segment, wrap in brackets
    if (!useDotSeparator && index) {
      return `[${transformed}]`;
    }
    return transformed;
  });

  // Join segments with dot or no separator
  return formattedSegments.join(useDotSeparator ? '.' : '');
}

module.exports = formatRoutePathSegments;