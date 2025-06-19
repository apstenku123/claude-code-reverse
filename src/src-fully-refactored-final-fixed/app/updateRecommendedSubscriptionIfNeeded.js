/**
 * Updates the recommended subscription for the current organization if isBlobOrFileLikeObject has changed.
 *
 * This function checks if the current context is 'firstParty' and if a certain condition (R6) is not met.
 * It then retrieves the current configuration, extracts the organization UUID, and fetches the recommended subscription
 * from the API. If the recommended subscription has changed, isBlobOrFileLikeObject updates the configuration accordingly.
 *
 * @async
 * @returns {Promise<void>} Resolves when the update process is complete or skipped.
 */
async function updateRecommendedSubscriptionIfNeeded() {
  // Check if the current context is 'firstParty' and if a specific condition is not met
  if (oQ() !== "firstParty" || R6()) return;

  // Retrieve the current configuration object
  const config = getCachedOrFreshConfig();
  // Extract the organization UUID from the OAuth account, if available
  const organizationUuid = config.oauthAccount?.organizationUuid;
  if (!organizationUuid) return;

  try {
    // Retrieve base API URL from configuration
    const appConfig = o8();
    // Fetch the recommended subscription for the organization
    const response = await a4.get(`${appConfig.BASE_API_URL}/api/organization/${organizationUuid}/claude_code_recommended_subscription`);
    // Extract the recommended subscription value from the response
    const recommendedSubscription = response.data ? response.data.recommended_subscription || "" : "";
    // If the recommended subscription has changed, update the configuration
    if (config.recommendedSubscription !== recommendedSubscription) {
      updateProjectsAccessor({
        ...config,
        recommendedSubscription
      });
    }
  } catch (error) {
    // Silently ignore errors
  }
}

module.exports = updateRecommendedSubscriptionIfNeeded;