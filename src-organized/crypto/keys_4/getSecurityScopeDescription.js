/**
 * Returns a human-readable description for a given security scope key.
 *
 * @param {string} securityScope - The key representing the security scope (e.g., 'local', 'project', 'user').
 * @returns {string} a human-readable description of the security scope, or the original key if not recognized.
 */
function getSecurityScopeDescription(securityScope) {
  switch (securityScope) {
    case "local":
      // 'local' scope is private to the user within this project
      return "Local (private to you in this project)";
    case "project":
      // 'project' scope is shared via .mcp.json file
      return "Project (shared via .mcp.json)";
    case "user":
      // 'user' scope is available in all projects for the user
      return "User (available in all your projects)";
    default:
      // If the scope is unrecognized, return the original key
      return securityScope;
  }
}

module.exports = getSecurityScopeDescription;