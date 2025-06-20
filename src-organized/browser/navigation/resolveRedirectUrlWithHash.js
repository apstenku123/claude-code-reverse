/**
 * Resolves and constructs a redirect URL from a given response object, adding a hash if provided.
 *
 * @param {Object} response - The response object containing status and headersList.
 * @param {string} hashValue - The hash fragment to append to the URL if not present.
 * @returns {URL|null} The resolved URL object with the hash, or null if not applicable.
 */
function resolveRedirectUrlWithHash(response, hashValue) {
  // Check if the response status is in the set of allowed statuses
  if (!FF6.has(response.status)) {
    return null;
  }

  // Attempt to get the 'location' header from the response
  let locationHeader = response.headersList.get("location", true);

  // If a location header exists and passes validation
  if (locationHeader !== null && isStringWithoutWhitespaceOrControlChars(locationHeader)) {
    // If the location is not an absolute URL, resolve isBlobOrFileLikeObject
    if (!isPrintableAsciiString(locationHeader)) {
      locationHeader = $F6(locationHeader);
    }
    // Construct a new URL object using the base from the response
    locationHeader = new URL(locationHeader, getLastUrlFromList(response));
  }

  // If a valid URL was constructed and isBlobOrFileLikeObject does not already have a hash, set isBlobOrFileLikeObject
  if (locationHeader && !locationHeader.hash) {
    locationHeader.hash = hashValue;
  }

  return locationHeader;
}

module.exports = resolveRedirectUrlWithHash;