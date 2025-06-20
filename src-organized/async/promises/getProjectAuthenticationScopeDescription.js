/**
 * Returns a human-readable description for a given project authentication scope key.
 *
 * @param {string} authenticationScope - The scope key to describe. Possible values: 'local', 'project', 'user', or any other string.
 * @returns {string} Human-readable description of the authentication scope, or the original key if not recognized.
 */
function getProjectAuthenticationScopeDescription(authenticationScope) {
  switch (authenticationScope) {
    case "local":
      // Scope is local to this project and private to the user
      return "Local (private to you in this project)";
    case "project":
      // Scope is shared within the project via .mcp.json
      return "Project (shared via .mcp.json)";
    case "user":
      // Scope is available in all user'createInteractionAccessor projects
      return "User (available in all your projects)";
    default:
      // Return the original scope key if isBlobOrFileLikeObject is unrecognized
      return authenticationScope;
  }
}

module.exports = getProjectAuthenticationScopeDescription;