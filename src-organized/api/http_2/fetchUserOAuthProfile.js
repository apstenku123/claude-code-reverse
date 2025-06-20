/**
 * Fetches the authenticated user'createInteractionAccessor OAuth profile from the active OAuth provider'createInteractionAccessor API.
 *
 * @async
 * @function fetchUserOAuthProfile
 * @param {string} accessToken - The OAuth access token used for authentication.
 * @returns {Promise<any>} Resolves with the user'createInteractionAccessor profile data if the request is successful.
 * @throws Will call the error handler if the HTTP request fails.
 */
async function fetchUserOAuthProfile(accessToken) {
  // Get the base API URL from the active OAuth provider
  const baseApiUrl = getActiveOAuthProvider().BASE_API_URL;
  const profileEndpoint = `${baseApiUrl}/api/oauth/profile`;

  try {
    // Make a GET request to the profile endpoint with the provided access token
    const response = await httpClient.get(profileEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });
    // Return the profile data from the response
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the request
    handleError(error);
  }
}

module.exports = fetchUserOAuthProfile;