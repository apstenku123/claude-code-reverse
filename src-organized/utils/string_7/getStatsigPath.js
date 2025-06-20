/**
 * Constructs a path string by joining the result of getPathSegments() with the string 'statsig'.
 *
 * @returns {string} The constructed path string ending with 'statsig'.
 */
function getStatsigPath() {
  // Retrieve an array of path segments from getPathSegments()
  const pathSegments = getPathSegments();
  // Join the path segments with 'statsig' as the separator
  return pathSegments.join('statsig');
}

module.exports = getStatsigPath;