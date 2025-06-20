/**
 * Counts the number of non-empty path segments in a given string, excluding any segments that are a comma (",").
 * The string is split on forward slashes ('/'), optionally preceded by a backslash (to handle escaped slashes).
 *
 * @param {string} pathString - The input string representing a path, possibly containing escaped slashes.
 * @returns {number} The count of non-empty, non-comma path segments.
 */
function countNonEmptyPathSegments(pathString) {
  // Split the input string on '/' or '\/' (escaped slash)
  const segments = pathString.split(/\?\//);

  // Filter out empty segments and segments that are just a comma
  const validSegments = segments.filter(
    (segment) => segment.length > 0 && segment !== ","
  );

  // Return the count of valid segments
  return validSegments.length;
}

module.exports = countNonEmptyPathSegments;
