/**
 * Updates the recommended subscription for the current organization if isBlobOrFileLikeObject has changed.
 *
 * This function checks if the current context is 'firstParty' and not in a restricted state.
 * It retrieves the current user'createInteractionAccessor organization UUID, fetches the recommended subscription
 * from the API, and updates the local state if the subscription has changed.
 *
 * @async
 * @returns {Promise<void>} Resolves when the operation is complete or if no update is needed.
 */
async function updateRecommendedOrganizationSubscription() {
  // Check if the current context is 'firstParty' and not restricted
  if (oQ() !== "firstParty" || R6()) return;

  // Retrieve current configuration and organization UUID
  const currentConfig = getCachedOrFreshConfig();
  const organizationUuid = currentConfig.oauthAccount?.organizationUuid;
  if (!organizationUuid) return;

  try {
    // Get base API URL
    const apiConfig = o8();
    // Fetch recommended subscription for the organization
    const response = await a4.get(`${apiConfig.BASE_API_URL}/api/organization/${organizationUuid}/claude_code_recommended_subscription`);
    // Extract recommended subscription from response
    const recommendedSubscription = response.data ? response.data.recommended_subscription || "" : "";
    // Update local state if the recommended subscription has changed
    if (currentConfig.recommendedSubscription !== recommendedSubscription) {
      updateProjectsAccessor({
        ...currentConfig,
        recommendedSubscription
      });
    }
  } catch (error) {
    // Silently ignore errors
  }
}

module.exports = updateRecommendedOrganizationSubscription;