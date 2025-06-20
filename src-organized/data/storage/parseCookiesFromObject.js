/**
 * Parses the 'cookie' property from a provided object and returns an object mapping cookie names to their values.
 *
 * @param {Object} cookieSource - An object expected to have a 'get' method that returns a cookie string when called with 'cookie'.
 * @returns {Object} An object where each property is a cookie name and its value is the corresponding cookie value.
 */
function parseCookiesFromObject(cookieSource) {
  // Ensure the function is called with exactly one argument and that the argument is of the expected brand/type
  S6.argumentLengthCheck(arguments, 1, "getCookies");
  S6.brandCheck(cookieSource, eY1, { strict: false });

  // Retrieve the cookie string from the source object
  const cookieString = cookieSource.get("cookie");
  const cookies = {};

  // If there is no cookie string, return an empty object
  if (!cookieString) return cookies;

  // Split the cookie string by semicolons to get individual cookies
  for (const cookiePair of cookieString.split(";")) {
    // Split each cookie pair into name and value (the value may contain additional '=' characters)
    const [rawName, ...rawValueParts] = cookiePair.split("=");
    const cookieName = rawName.trim();
    const cookieValue = rawValueParts.join("=");
    cookies[cookieName] = cookieValue;
  }

  return cookies;
}

module.exports = parseCookiesFromObject;