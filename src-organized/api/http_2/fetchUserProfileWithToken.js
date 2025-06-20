/**
 * Fetches the authenticated user'createInteractionAccessor profile from the API using the provided OAuth access token.
 *
 * @async
 * @function fetchUserProfileWithToken
 * @param {string} accessToken - The OAuth access token used for authentication.
 * @returns {Promise<any>} Resolves with the user'createInteractionAccessor profile data if the request is successful; otherwise, handles the error.
 */
async function fetchUserProfileWithToken(accessToken) {
  // Construct the profile endpoint URL using the base API URL
  const baseApiUrl = o8().BASE_API_URL;
  const profileEndpointUrl = `${baseApiUrl}/api/oauth/profile`;

  try {
    // Make a GET request to fetch the user profile, including the access token in the Authorization header
    const response = await a4.get(profileEndpointUrl, {
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

module.exports = fetchUserProfileWithToken;