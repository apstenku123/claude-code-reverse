/**
 * Fetches a resource using Axios, handling HTTP redirects manually and only allowing redirects to the same host.
 *
 * @param {string} url - The URL to fetch.
 * @param {AbortSignal} abortSignal - The AbortSignal to cancel the request if needed.
 * @param {function} isRedirectAllowed - a function that takes the original and redirect URLs and returns true if the redirect is allowed.
 * @returns {Promise<AxiosResponse>} - The Axios response object containing the resource data.
 * @throws {Error} - Throws if a redirect is not allowed, or if a redirect is missing a Location header, or for other Axios/network errors.
 */
async function fetchWithRedirectHandling(url, abortSignal, isRedirectAllowed) {
  try {
    // Attempt to fetch the resource with no automatic redirects
    return await a4.get(url, {
      signal: abortSignal,
      maxRedirects: 0, // Prevent Axios from following redirects automatically
      responseType: "arraybuffer",
      maxContentLength: EV5
    });
  } catch (error) {
    // Check if the error is an Axios redirect error
    if (
      a4.isAxiosError(error) &&
      error.response &&
      [301, 302, 307, 308].includes(error.response.status)
    ) {
      const locationHeader = error.response.headers.location;
      if (!locationHeader) {
        throw new Error("Redirect missing Location header");
      }
      // Resolve the new URL relative to the original
      const redirectUrl = new URL(locationHeader, url).toString();
      // Only allow redirects that pass the isRedirectAllowed check
      if (isRedirectAllowed(url, redirectUrl)) {
        // Recursively follow the redirect
        return fetchWithRedirectHandling(redirectUrl, abortSignal, isRedirectAllowed);
      } else {
        throw new Error("Redirect not allowed. Only redirects to the same host are permitted.");
      }
    }
    // Rethrow any other errors
    throw error;
  }
}

module.exports = fetchWithRedirectHandling;