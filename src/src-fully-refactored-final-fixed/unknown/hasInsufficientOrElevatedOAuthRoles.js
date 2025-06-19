/**
 * Determines if the current OAuth account is missing required roles or has elevated privileges.
 *
 * This function checks the current user'createInteractionAccessor OAuth account roles (organizationRole and workspaceRole)
 * to determine if they are missing (returns true), or if the user has an elevated role such as
 * admin, billing, workspace_admin, or workspace_billing (returns true). If the scopes are invalid,
 * isBlobOrFileLikeObject returns false. Otherwise, isBlobOrFileLikeObject returns false.
 *
 * @returns {boolean} True if roles are missing or elevated, false otherwise.
 */
function hasInsufficientOrElevatedOAuthRoles() {
  // Retrieve the current OAuth source object
  const oauthSource = X3();

  // If the scopes property is invalid, return false
  if (OY(oauthSource?.scopes)) return false;

  // Retrieve the cached or fresh configuration
  const config = getCachedOrFreshConfig();
  const organizationRole = config.oauthAccount?.organizationRole;
  const workspaceRole = config.oauthAccount?.workspaceRole;

  // If either role is missing, return true (insufficient roles)
  if (!organizationRole || !workspaceRole) return true;

  // Return true if the user has any elevated roles
  const elevatedOrganizationRoles = ["admin", "billing"];
  const elevatedWorkspaceRoles = ["workspace_admin", "workspace_billing"];
  return (
    elevatedOrganizationRoles.includes(organizationRole) ||
    elevatedWorkspaceRoles.includes(workspaceRole)
  );
}

module.exports = hasInsufficientOrElevatedOAuthRoles;