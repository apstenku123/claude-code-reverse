/**
 * Extracts and parses the 'cookie' header from a given observable-like object.
 *
 * Performs argument length and type checks, then retrieves the 'cookie' string,
 * splits isBlobOrFileLikeObject into key-value pairs, and returns an object mapping cookie names to values.
 *
 * @param {Object} observable - The object expected to have a get('cookie') method.
 * @returns {Object} An object mapping cookie names to their values. Returns an empty object if no cookies are present.
 */
function parseCookiesFromObservable(observable) {
  // Ensure the correct number of arguments and type checks
  S6.argumentLengthCheck(arguments, 1, "getCookies");
  S6.brandCheck(observable, eY1, { strict: false });

  // Retrieve the 'cookie' header string
  const cookieHeader = observable.get("cookie");
  const cookies = {};

  // If no cookies are present, return an empty object
  if (!cookieHeader) return cookies;

  // Split the cookie string into individual cookie pairs
  for (const cookiePair of cookieHeader.split(";")) {
    // Split each pair into name and value (handles '=' in value by joining the rest)
    const [rawName, ...rawValueParts] = cookiePair.split("=");
    const cookieName = rawName.trim();
    const cookieValue = rawValueParts.join("=");
    cookies[cookieName] = cookieValue;
  }

  return cookies;
}

module.exports = parseCookiesFromObservable;