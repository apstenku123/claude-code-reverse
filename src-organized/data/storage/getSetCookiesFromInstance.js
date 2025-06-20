/**
 * Retrieves and processes the 'Set-Cookie' headers from the provided instance.
 *
 * This function checks the validity of the input instance, retrieves its set cookies (if any),
 * and maps each cookie through a transformation function before returning the result.
 *
 * @param {object} instance - The object expected to provide a getSetCookie() method.
 * @returns {Array<any>} An array of processed 'Set-Cookie' header values, or an empty array if none exist.
 */
function getSetCookiesFromInstance(instance) {
  // Ensure exactly one argument is provided and validate the type/brand of the instance
  S6.argumentLengthCheck(arguments, 1, "getSetCookies");
  S6.brandCheck(instance, eY1, { strict: false });

  // Retrieve the set-cookie headers from the instance
  const setCookieHeaders = instance.getSetCookie();

  // If no set-cookie headers are present, return an empty array
  if (!setCookieHeaders) {
    return [];
  }

  // Transform each set-cookie header using the YE6 function
  return setCookieHeaders.map((cookieHeader) => YE6(cookieHeader));
}

module.exports = getSetCookiesFromInstance;