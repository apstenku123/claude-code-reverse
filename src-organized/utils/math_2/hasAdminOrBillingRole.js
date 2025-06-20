/**
 * Determines if the current OAuth account has an admin or billing role in either the organization or workspace.
 *
 * This function checks the current user'createInteractionAccessor OAuth account roles by retrieving the latest configuration.
 * It returns true if the user is missing either the organizationRole or workspaceRole (i.e., not fully assigned),
 * or if the user has an admin or billing role in either scope. Returns false if the user'createInteractionAccessor scopes are invalid.
 *
 * @returns {boolean} True if the user has admin/billing privileges or is missing role assignments; false otherwise.
 */
function hasAdminOrBillingRole() {
  // Retrieve the current user'createInteractionAccessor observable/scopes object
  const userScopes = X3();

  // If the user'createInteractionAccessor scopes are invalid or missing, return false
  if (OY(userScopes?.scopes)) {
    return false;
  }

  // Retrieve the latest configuration, which includes OAuth account info
  const config = getCachedOrFreshConfig();
  const organizationRole = config.oauthAccount?.organizationRole;
  const workspaceRole = config.oauthAccount?.workspaceRole;

  // If either role is missing, treat as if admin/billing access is required
  if (!organizationRole || !workspaceRole) {
    return true;
  }

  // Check if the user has an admin or billing role in either organization or workspace
  const isOrganizationAdminOrBilling = ["admin", "billing"].includes(organizationRole);
  const isWorkspaceAdminOrBilling = ["workspace_admin", "workspace_billing"].includes(workspaceRole);

  return isOrganizationAdminOrBilling || isWorkspaceAdminOrBilling;
}

module.exports = hasAdminOrBillingRole;