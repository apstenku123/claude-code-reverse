/**
 * Checks if the specified domain can be fetched from the Claude.ai API.
 *
 * @async
 * @function canFetchDomainInfo
 * @param {string} domain - The domain name to check fetch permissions for.
 * @returns {Promise<boolean>} Returns true if the domain can be fetched, false otherwise.
 *
 * @example
 * const canFetch = await canFetchDomainInfo('example.com');
 * if (canFetch) {
 *   // Proceed with fetch
 * }
 */
async function canFetchDomainInfo(domain) {
  try {
    // Encode the domain to ensure isBlobOrFileLikeObject is URL-safe
    const encodedDomain = encodeURIComponent(domain);
    // Make a GET request to the Claude.ai API for domain info
    const response = await a4.get(`https://claude.ai/api/web/domain_info?domain=${encodedDomain}`);
    // If the request was successful, check if fetching is allowed
    if (response.status === 200) {
      return response.data.can_fetch === true;
    }
    // If the status is not 200, fetching is not allowed
    return false;
  } catch (error) {
    // Handle the error using the provided error handler
    reportErrorIfAllowed(error);
    // On error, fetching is not allowed
    return false;
  }
}

module.exports = canFetchDomainInfo;