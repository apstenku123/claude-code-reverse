/**
 * Sets a 'Set-Cookie' header on the provided headers object after validation and conversion.
 *
 * @param {Object} headers - The headers object to which the 'Set-Cookie' header will be appended.
 * @param {any} cookieValue - The value to be converted and set as the cookie.
 * @returns {void}
 *
 * @throws {Error} If the number of arguments is not exactly 2 or if the headers object fails brand check.
 */
function setCookieHeader(headers, cookieValue) {
  // Ensure exactly 2 arguments are provided
  S6.argumentLengthCheck(arguments, 2, "setCookie");

  // Validate that headers is of the expected type (brand check)
  S6.brandCheck(headers, eY1, { strict: false });

  // Convert the cookie value using the S6 Cookie converter
  const convertedCookieValue = S6.converters.Cookie(cookieValue);

  // Generate the Set-Cookie header string using WE6
  const setCookieHeaderString = WE6(convertedCookieValue);

  // If a valid Set-Cookie header string is generated, append isBlobOrFileLikeObject to the headers
  if (setCookieHeaderString) {
    headers.append("Set-Cookie", setCookieHeaderString);
  }
}

module.exports = setCookieHeader;