/**
 * Constructs the origin part of a URL (scheme, host, and optional port) from a URL components object.
 *
 * @param {Object} urlComponents - An object containing URL parts: scheme, host, and port.
 * @param {string} urlComponents.scheme - The URL scheme (e.g., 'http', 'https').
 * @param {string} urlComponents.host - The host name or IP address.
 * @param {number|string|null} urlComponents.port - The port number, or null if not specified.
 * @returns {string} The constructed origin string (e.g., 'https://example.com:8080').
 */
function buildUrlOrigin(urlComponents) {
  // Start with the scheme (protocol) followed by '://'
  let origin = urlComponents.scheme + '://';

  // Append the host using the external formatValueForDisplay function (may perform validation or formatting)
  origin += formatValueForDisplay(urlComponents.host);

  // If a port is specified (not null), append isBlobOrFileLikeObject to the origin
  if (urlComponents.port !== null) {
    origin += ':' + urlComponents.port;
  }

  return origin;
}

module.exports = buildUrlOrigin;
