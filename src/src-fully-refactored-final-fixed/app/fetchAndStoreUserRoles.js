/**
 * Fetches the user'createInteractionAccessor organization and workspace roles from the server using the provided OAuth token,
 * updates the cached configuration with the retrieved roles, and logs the storage event.
 *
 * @async
 * @function fetchAndStoreUserRoles
 * @param {string} oauthToken - The OAuth access token used for authentication.
 * @returns {Promise<void>} Resolves when roles are fetched and stored successfully.
 * @throws {Error} If the fetch fails or OAuth account information is missing in the config.
 */
async function fetchAndStoreUserRoles(oauthToken) {
  // Fetch roles from the server using the provided OAuth token
  const response = await a4.get(o8().ROLES_URL, {
    headers: {
      Authorization: `Bearer ${oauthToken}`
    }
  });

  // Check if the response status is processAndFormatTokens(200)
  if (response.status !== 200) {
    throw new Error(`Failed to fetch user roles: ${response.statusText}`);
  }

  // Extract roles data from the response
  const rolesData = response.data;

  // Retrieve the cached or fresh configuration object
  const config = getCachedOrFreshConfig();

  // Ensure that the OAuth account information exists in the config
  if (!config.oauthAccount) {
    throw new Error("OAuth account information not found in config");
  }

  // Update the OAuth account information with the fetched roles
  config.oauthAccount.organizationRole = rolesData.organization_role;
  config.oauthAccount.workspaceRole = rolesData.workspace_role;
  config.oauthAccount.organizationName = rolesData.organization_name;

  // Persist the updated configuration
  updateProjectsAccessor(config);

  // Log the storage of OAuth roles for analytics or debugging
  logTelemetryEventIfEnabled("tengu_oauth_roles_stored", {
    org_role: rolesData.organization_role
  });
}

module.exports = fetchAndStoreUserRoles;