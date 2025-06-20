/**
 * Retrieves and parses the 'Set-Cookie' headers from the provided HTTP response-like object.
 *
 * @param {object} httpResponse - The object expected to provide a getSetCookie() method.
 * @returns {Array<any>} An array of parsed Set-Cookie header values, or an empty array if none are found.
 */
function getParsedSetCookies(httpResponse) {
  // Ensure exactly one argument is provided and validate the object'createInteractionAccessor brand/type
  S6.argumentLengthCheck(arguments, 1, "getSetCookies");
  S6.brandCheck(httpResponse, eY1, { strict: false });

  // Retrieve the raw Set-Cookie headers from the response object
  const setCookieHeaders = httpResponse.getSetCookie();

  // If there are no Set-Cookie headers, return an empty array
  if (!setCookieHeaders) {
    return [];
  }

  // Parse each Set-Cookie header using the YE6 parser function
  return setCookieHeaders.map((rawSetCookieHeader) => YE6(rawSetCookieHeader));
}

module.exports = getParsedSetCookies;