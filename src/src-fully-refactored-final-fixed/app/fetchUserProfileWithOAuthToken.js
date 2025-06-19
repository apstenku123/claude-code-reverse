/**
 * Fetches the authenticated user'createInteractionAccessor profile from the OAuth provider'createInteractionAccessor API using the provided access token.
 *
 * @async
 * @function fetchUserProfileWithOAuthToken
 * @param {string} accessToken - The OAuth access token used for authentication.
 * @returns {Promise<any>} Resolves with the user'createInteractionAccessor profile data if successful; otherwise, returns undefined after handling the error.
 */
async function fetchUserProfileWithOAuthToken(accessToken) {
  // Get the base API URL from the selected OAuth provider
  const oauthProvider = getOAuthProvider();
  const profileApiUrl = `${oauthProvider.BASE_API_URL}/api/oauth/profile`;

  try {
    // Make a GET request to the profile endpoint with the provided access token
    const response = await a4.get(profileApiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });
    // Return the profile data from the response
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the request
    reportErrorIfAllowed(error);
  }
}

module.exports = fetchUserProfileWithOAuthToken;