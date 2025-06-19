/**
 * Counts the number of non-empty, non-comma path segments in a given string, splitting by forward slashes (handling optional backslash escapes).
 *
 * @param {string} pathString - The input string representing a path, possibly containing escaped slashes and commas.
 * @returns {number} The count of non-empty, non-comma path segments.
 */
function countNonCommaPathSegments(pathString) {
  // Split the input string by forward slashes, optionally preceded by a backslash
  const segments = pathString.split(/\?\//);

  // Filter out empty segments and segments that are just a comma
  const validSegments = segments.filter(
    segment => segment.length > 0 && segment !== ","
  );

  // Return the number of valid segments
  return validSegments.length;
}

module.exports = countNonCommaPathSegments;