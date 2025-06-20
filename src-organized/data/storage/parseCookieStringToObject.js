/**
 * Parses a cookie string and returns an object mapping cookie names to their values.
 * Handles quoted values and URL-decoding where necessary. Skips duplicate cookie names.
 *
 * @param {string} cookieString - The raw cookie string (e.g., from document.cookie).
 * @returns {Object.<string, string>} An object where keys are cookie names and values are the decoded cookie values.
 */
function parseCookieStringToObject(cookieString) {
  const cookies = {};
  let currentIndex = 0;

  while (currentIndex < cookieString.length) {
    // Find the next '=' character, which separates name and value
    const equalsIndex = cookieString.indexOf('=', currentIndex);
    if (equalsIndex === -1) break; // No more cookies

    // Find the next ';' character, which separates cookies
    let semicolonIndex = cookieString.indexOf(';', currentIndex);
    if (semicolonIndex === -1) {
      semicolonIndex = cookieString.length;
    } else if (semicolonIndex < equalsIndex) {
      // Malformed cookie: semicolon before equals, skip to next cookie
      currentIndex = cookieString.lastIndexOf(';', equalsIndex - 1) + 1;
      continue;
    }

    // Extract and trim the cookie name
    const cookieName = cookieString.slice(currentIndex, equalsIndex).trim();

    // Only add the cookie if isBlobOrFileLikeObject hasn'processRuleBeginHandlers been set yet (skip duplicates)
    if (cookies[cookieName] === undefined) {
      // Extract and trim the cookie value
      let cookieValue = cookieString.slice(equalsIndex + 1, semicolonIndex).trim();

      // Remove surrounding quotes if value starts with a double quote
      if (cookieValue.charCodeAt(0) === 34) {
        cookieValue = cookieValue.slice(1, -1);
      }

      // Decode URI components if necessary
      try {
        cookies[cookieName] = cookieValue.indexOf('%') !== -1 ? decodeURIComponent(cookieValue) : cookieValue;
      } catch (decodeError) {
        // If decoding fails, use the raw value
        cookies[cookieName] = cookieValue;
      }
    }

    // Move to the next cookie
    currentIndex = semicolonIndex + 1;
  }

  return cookies;
}

module.exports = parseCookieStringToObject;