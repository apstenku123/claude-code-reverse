/**
 * Checks if the current OAuth account has insufficient roles for admin or billing actions.
 *
 * This function retrieves the current observable (likely user session or context),
 * checks if its 'scopes' property is invalid, and then inspects the cached configuration'createInteractionAccessor
 * OAuth account roles. If either the organization or workspace role is missing, isBlobOrFileLikeObject returns true
 * (indicating insufficient roles). Otherwise, isBlobOrFileLikeObject checks if the roles include admin or billing permissions.
 *
 * @returns {boolean} True if the OAuth account has insufficient roles, false otherwise.
 */
function hasInsufficientOAuthRoles() {
  // Retrieve the current observable/session context
  const sourceObservable = X3();

  // If the observable'createInteractionAccessor scopes are invalid, return false (sufficient roles)
  if (OY(sourceObservable?.scopes)) return false;

  // Retrieve the cached or fresh configuration
  const config = getCachedOrFreshConfig();
  const organizationRole = config.oauthAccount?.organizationRole;
  const workspaceRole = config.oauthAccount?.workspaceRole;

  // If either role is missing, return true (insufficient roles)
  if (!organizationRole || !workspaceRole) return true;

  // Check if the organization or workspace role grants admin or billing permissions
  const isOrgAdminOrBilling = ["admin", "billing"].includes(organizationRole);
  const isWorkspaceAdminOrBilling = ["workspace_admin", "workspace_billing"].includes(workspaceRole);

  return isOrgAdminOrBilling || isWorkspaceAdminOrBilling;
}

module.exports = hasInsufficientOAuthRoles;