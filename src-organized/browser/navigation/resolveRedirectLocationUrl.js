/**
 * Resolves and constructs a redirect URL from a response object if applicable.
 *
 * @param {Object} response - The response object containing status and headersList.
 * @param {string} hashValue - The hash fragment to append to the resulting URL if not present.
 * @returns {URL|null} The resolved URL object with the hash fragment, or null if not applicable.
 */
function resolveRedirectLocationUrl(response, hashValue) {
  // Check if the response status is in the set of valid redirect statuses
  if (!FF6.has(response.status)) {
    return null;
  }

  // Attempt to retrieve the 'location' header from the response headers
  let locationHeader = response.headersList.get("location", true);

  // If a location header exists and is a valid URL string
  if (locationHeader !== null && isStringWithoutWhitespaceOrControlChars(locationHeader)) {
    // If the location is not an absolute URL, resolve isBlobOrFileLikeObject relative to the response
    if (!isPrintableAsciiString(locationHeader)) {
      locationHeader = $F6(locationHeader);
    }
    // Construct a new URL object, using the base URL derived from the response
    locationHeader = new URL(locationHeader, getLastUrlFromList(response));
  }

  // If a URL was constructed and isBlobOrFileLikeObject does not have a hash, set the hash fragment
  if (locationHeader && !locationHeader.hash) {
    locationHeader.hash = hashValue;
  }

  return locationHeader;
}

module.exports = resolveRedirectLocationUrl;