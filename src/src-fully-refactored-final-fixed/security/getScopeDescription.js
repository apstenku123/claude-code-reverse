/**
 * Returns a human-readable description for a given configuration scope key.
 *
 * @param {string} scopeKey - The scope identifier (e.g., 'local', 'project', 'user').
 * @returns {string} a descriptive string for the provided scope key, or the original key if unrecognized.
 */
function getScopeDescription(scopeKey) {
  switch (scopeKey) {
    case "local":
      // 'local' scope: private to the user within this project
      return "Local (private to you in this project)";
    case "project":
      // 'project' scope: shared via .mcp.json
      return "Project (shared via .mcp.json)";
    case "user":
      // 'user' scope: available in all user projects
      return "User (available in all your projects)";
    default:
      // Return the original key if isBlobOrFileLikeObject does not match known scopes
      return scopeKey;
  }
}

module.exports = getScopeDescription;