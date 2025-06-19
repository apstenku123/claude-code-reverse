/**
 * Checks if a given path segment is valid.
 * a valid path segment is a non-empty string that is not '.' or '..'.
 *
 * @param {string} pathSegment - The path segment to validate.
 * @returns {boolean} True if the path segment is valid; otherwise, false.
 */
const isValidPathSegment = (pathSegment) => {
  // Ensure the path segment is not empty and not special directory indicators
  return pathSegment.length !== 0 && pathSegment !== "." && pathSegment !== "..";
};

module.exports = isValidPathSegment;
