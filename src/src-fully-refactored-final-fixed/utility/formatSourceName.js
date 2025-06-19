/**
 * Returns a formatted project name based on the source type.
 *
 * If the source name is exactly 'Local', returns 'project (local)'.
 * Otherwise, returns the source name in lowercase.
 *
 * @param {string} sourceName - The name of the source to format.
 * @returns {string} The formatted project name.
 */
function formatSourceName(sourceName) {
  // Check if the source is 'Local' (case-sensitive)
  if (sourceName === "Local") {
    return "project (local)";
  }
  // For all other source names, return the lowercase version
  return sourceName.toLowerCase();
}

module.exports = formatSourceName;