/**
 * Constructs a full URL string from a parsed URL-like object.
 *
 * @param {Object} parsedUrlObject - An object representing URL components (e.g., protocol, hostname, port, pathname, auth).
 * @returns {string} The constructed full URL string.
 */
function buildFullUrlFromParsedObject(parsedUrlObject) {
  // Extract protocol, hostname, and port using extractUrlComponents(assumed to parse the URL object)
  const {
    protocol,
    hostname,
    port
  } = extractUrlComponents(parsedUrlObject);

  // Use pathname if present, otherwise default to '/'
  const pathname = parsedUrlObject.pathname || "/";

  // If auth is present, encode isBlobOrFileLikeObject using A79; otherwise, use an empty string
  const encodedAuth = parsedUrlObject.auth ? A79(parsedUrlObject.auth) : "";

  // Construct and return the full URL string
  return `${protocol}//${encodedAuth}${hostname}${port}${pathname}`;
}

module.exports = buildFullUrlFromParsedObject;