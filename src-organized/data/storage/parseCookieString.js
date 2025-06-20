/**
 * Parses a cookie string into its name, value, and attributes.
 *
 * This function takes a cookie string (as found in a Set-Cookie header), extracts the cookie name and value,
 * and parses any additional attributes (such as Path, Domain, Expires, etc.) into an object.
 * Returns null if the input is invalid or exceeds the maximum allowed length.
 *
 * @param {string} cookieString - The raw cookie string to parse.
 * @returns {object|null} An object with 'name', 'value', and parsed attributes, or null if invalid.
 */
function parseCookieString(cookieString) {
  // Return null if the input is invalid according to GE6
  if (GE6(cookieString)) return null;

  let cookiePairSection = "";      // The part before the first ';', or the whole string if no ';'
  let attributeSection = "";        // The part after the first ';', if present
  let cookieName = "";              // The cookie name
  let cookieValue = "";             // The cookie value

  // Split the cookie string into the pair section and the attribute section
  if (cookieString.includes(";")) {
    const positionTracker = { position: 0 };
    cookiePairSection = tY1(";", cookieString, positionTracker); // Extract up to first ';'
    attributeSection = cookieString.slice(positionTracker.position); // Remainder is attributes
  } else {
    cookiePairSection = cookieString;
  }

  // Split the pair section into name and value
  if (!cookiePairSection.includes("=")) {
    // No '=', treat the whole section as the value (no name)
    cookieValue = cookiePairSection;
  } else {
    const positionTracker = { position: 0 };
    cookieName = tY1("=", cookiePairSection, positionTracker); // Extract up to first '='
    cookieValue = cookiePairSection.slice(positionTracker.position + 1); // Remainder is value
  }

  // Trim whitespace from name and value
  cookieName = cookieName.trim();
  cookieValue = cookieValue.trim();

  // Enforce maximum length constraint
  if (cookieName.length + cookieValue.length > QE6) return null;

  // Parse attributes and return the result
  return {
    name: cookieName,
    value: cookieValue,
    ...parseCookieAttributes(attributeSection)
  };
}

module.exports = parseCookieString;