/**
 * Constructs a URL for an embedded error page with query parameters based on the provided DSN and options.
 *
 * @param {object} dsnSource - The source object used to generate a DSN (Data Source Name).
 * @param {object} options - Additional options to include as query parameters. May include 'user', 'onClose', etc.
 * @returns {string} The constructed error page URL, or an empty string if the DSN is invalid.
 */
function buildErrorPageUrl(dsnSource, options) {
  // Attempt to create a DSN object from the source
  const dsnObject = nU1.makeDsn(dsnSource);
  if (!dsnObject) return "";

  // Base URL for the embedded error page
  const baseUrl = `${buildApiBaseUrl(dsnObject)}embed/error-page/`;

  // Start query string with the DSN
  let queryString = `dsn=${nU1.dsnToString(dsnObject)}`;

  // Iterate over all properties in options to add them as query parameters
  for (const key in options) {
    if (key === "dsn" || key === "onClose") {
      // Skip reserved keys
      continue;
    }
    if (key === "user") {
      // If user info is provided, add name and email if present
      const user = options.user;
      if (!user) continue;
      if (user.name) {
        queryString += `&name=${encodeURIComponent(user.name)}`;
      }
      if (user.email) {
        queryString += `&email=${encodeURIComponent(user.email)}`;
      }
    } else {
      // Add all other options as query parameters
      queryString += `&${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`;
    }
  }

  // Return the full error page URL with query parameters
  return `${baseUrl}?${queryString}`;
}

module.exports = buildErrorPageUrl;