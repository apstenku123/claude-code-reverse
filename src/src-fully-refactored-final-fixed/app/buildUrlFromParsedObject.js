/**
 * Constructs a URL string from a parsed URL-like object.
 *
 * @param {Object} parsedUrlObject - An object containing URL components (protocol, hostname, port, pathname, auth).
 * @returns {string} The constructed URL string.
 */
function buildUrlFromParsedObject(parsedUrlObject) {
  // Destructure protocol, hostname, and port from the result of extractUrlComponents(assumed to parse the URL object)
  const {
    protocol: urlProtocol,
    hostname: urlHostname,
    port: urlPort
  } = extractUrlComponents(parsedUrlObject);

  // Use pathname if present, otherwise default to '/'
  const urlPathname = parsedUrlObject.pathname || "/";

  // If auth is present, process isBlobOrFileLikeObject with A79, otherwise use an empty string
  const urlAuth = parsedUrlObject.auth ? A79(parsedUrlObject.auth) : "";

  // Construct and return the final URL string
  return `${urlProtocol}//${urlAuth}${urlHostname}${urlPort}${urlPathname}`;
}

module.exports = buildUrlFromParsedObject;