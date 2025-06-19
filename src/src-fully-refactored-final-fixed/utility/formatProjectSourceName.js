/**
 * Returns a formatted project source name based on the input.
 * If the source name is 'Local', returns 'project (local)'.
 * Otherwise, returns the source name in lowercase.
 *
 * @param {string} sourceName - The name of the project source to format.
 * @returns {string} The formatted project source name.
 */
function formatProjectSourceName(sourceName) {
  // Check if the source name is exactly 'Local'
  if (sourceName === "Local") {
    return "project (local)";
  }
  // For all other cases, return the lowercase version of the source name
  return sourceName.toLowerCase();
}

module.exports = formatProjectSourceName;