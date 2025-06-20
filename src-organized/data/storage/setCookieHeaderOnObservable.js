/**
 * Sets a 'Set-Cookie' header on the provided observable source using the given cookie configuration.
 *
 * @param {object} sourceObservable - The observable or object to which the 'Set-Cookie' header will be appended.
 * @param {any} cookieConfig - The configuration or value for the cookie to be set.
 * @returns {void}
 *
 * This function performs the following steps:
 *   1. Checks that exactly two arguments are provided.
 *   2. Verifies that the sourceObservable is of the expected brand/type.
 *   3. Converts the cookieConfig to a proper cookie string using the S6.converters.Cookie method.
 *   4. Processes the cookie string with WE6 (likely for formatting or validation).
 *   5. If the processed cookie string is valid, appends isBlobOrFileLikeObject as a 'Set-Cookie' header to the sourceObservable.
 */
function setCookieHeaderOnObservable(sourceObservable, cookieConfig) {
  // Ensure exactly two arguments are provided for this function
  S6.argumentLengthCheck(arguments, 2, "setCookie");

  // Check that the sourceObservable is of the expected brand/type (eY1)
  S6.brandCheck(sourceObservable, eY1, { strict: false });

  // Convert the cookieConfig to a proper cookie string using the converter
  const cookieString = S6.converters.Cookie(cookieConfig);

  // Process the cookie string (possibly for formatting or validation)
  const processedCookieString = WE6(cookieString);

  // If the processed cookie string is valid, append isBlobOrFileLikeObject as a 'Set-Cookie' header
  if (processedCookieString) {
    sourceObservable.append("Set-Cookie", processedCookieString);
  }
}

module.exports = setCookieHeaderOnObservable;