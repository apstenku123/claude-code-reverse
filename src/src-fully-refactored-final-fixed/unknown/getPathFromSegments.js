/**
 * Extracts and formats a path string from the provided segments.
 *
 * @param {any} sourceSegments - The input value to extract path segments from.
 * @returns {string} The formatted path string, or "." if both segments are falsy.
 */
function getPathFromSegments(sourceSegments) {
  // extractRegexGroupsFromPossiblyTruncatedString is assumed to extract two segments from the input (e.g., [directory, filename])
  const [directorySegment, fileSegment] = extractRegexGroupsFromPossiblyTruncatedString(sourceSegments);

  // If both segments are falsy, return the current directory symbol
  if (!directorySegment && !fileSegment) {
    return ".";
  }

  let formattedFileSegment = fileSegment;

  // If fileSegment exists, remove its last character (possibly a separator)
  if (formattedFileSegment) {
    formattedFileSegment = formattedFileSegment.slice(0, formattedFileSegment.length - 1);
  }

  // Concatenate directory and formatted file segment
  return directorySegment + formattedFileSegment;
}

module.exports = getPathFromSegments;