/**
 * Returns a formatted label for a project source.
 * If the source is 'Local', returns 'project (local)'.
 * Otherwise, returns the source string in lowercase.
 *
 * @param {string} projectSource - The source of the project (e.g., 'Local', 'Remote').
 * @returns {string} The formatted project source label.
 */
function formatProjectSourceLabel(projectSource) {
  // Special case: if the source is 'Local', return a user-friendly label
  if (projectSource === "Local") {
    return "project (local)";
  }
  // For all other sources, return the lowercase version
  return projectSource.toLowerCase();
}

module.exports = formatProjectSourceLabel;