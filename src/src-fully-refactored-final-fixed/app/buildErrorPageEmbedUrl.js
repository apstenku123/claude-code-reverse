/**
 * Constructs an embed URL for an error page, including DSN and additional query parameters.
 *
 * @param {object} dsnSource - The source object used to generate a DSN (Data Source Name).
 * @param {object} options - Additional options to include as query parameters. May include 'user', 'onClose', etc.
 * @returns {string} The constructed embed URL for the error page, or an empty string if DSN is invalid.
 */
function buildErrorPageEmbedUrl(dsnSource, options) {
  // Attempt to create a DSN object from the provided source
  const dsnObject = nU1.makeDsn(dsnSource);
  if (!dsnObject) return "";

  // Build the base URL for the error page embed
  const baseUrl = `${buildApiBaseUrl(dsnObject)}embed/error-page/`;
  // Start the query string with the DSN
  let queryString = `dsn=${nU1.dsnToString(dsnObject)}`;

  // Iterate over all properties in the options object
  for (const key in options) {
    if (key === "dsn" || key === "onClose") {
      // Skip 'dsn' and 'onClose' keys
      continue;
    }
    if (key === "user") {
      // If 'user' object is present, add its 'name' and 'email' if available
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

  // Return the complete embed URL with query parameters
  return `${baseUrl}?${queryString}`;
}

module.exports = buildErrorPageEmbedUrl;