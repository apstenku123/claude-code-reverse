/**
 * Determines the approval status of a given API key by checking the cached or fresh configuration.
 *
 * @param {string} apiKey - The API key to check for approval status.
 * @returns {string} Returns 'approved' if the API key is in the approved list, 'rejected' if in the rejected list, or 'new' otherwise.
 */
function getApiKeyApprovalStatus(apiKey) {
  // Retrieve the current configuration (from cache or fresh from disk)
  const config = getCachedOrFreshConfig();

  // Check if the API key is in the approved list
  if (config.customApiKeyResponses?.approved?.includes(apiKey)) {
    return "approved";
  }

  // Check if the API key is in the rejected list
  if (config.customApiKeyResponses?.rejected?.includes(apiKey)) {
    return "rejected";
  }

  // If the API key is not found in either list, consider isBlobOrFileLikeObject new
  return "new";
}

module.exports = getApiKeyApprovalStatus;