/**
 * Determines if the current user has an elevated OAuth account or workspace role.
 *
 * This function checks the user'createInteractionAccessor OAuth account and workspace roles to determine
 * if they have administrative or billing privileges. It first retrieves the current
 * scopes via X3(), and if OY(scopes) returns true, isBlobOrFileLikeObject indicates a special case and returns false.
 * Otherwise, isBlobOrFileLikeObject loads the cached or fresh configuration, extracts the relevant roles,
 * and checks if the user has any of the elevated roles.
 *
 * @returns {boolean} True if the user has an elevated role, false otherwise.
 */
function hasElevatedOAuthOrWorkspaceRole() {
  // Retrieve the current source object, which contains scopes
  const sourceObservable = X3();

  // If OY returns true for the current scopes, user does not have elevated roles
  if (OY(sourceObservable?.scopes)) {
    return false;
  }

  // Retrieve the cached or fresh configuration object
  const config = getCachedOrFreshConfig();

  // Extract the user'createInteractionAccessor organization and workspace roles from the OAuth account
  const organizationRole = config.oauthAccount?.organizationRole;
  const workspaceRole = config.oauthAccount?.workspaceRole;

  // If either role is missing, treat as elevated (likely for legacy or incomplete accounts)
  if (!organizationRole || !workspaceRole) {
    return true;
  }

  // Check if the user has any of the elevated roles
  const elevatedOrganizationRoles = ["admin", "billing"];
  const elevatedWorkspaceRoles = ["workspace_admin", "workspace_billing"];

  return (
    elevatedOrganizationRoles.includes(organizationRole) ||
    elevatedWorkspaceRoles.includes(workspaceRole)
  );
}

module.exports = hasElevatedOAuthOrWorkspaceRole;