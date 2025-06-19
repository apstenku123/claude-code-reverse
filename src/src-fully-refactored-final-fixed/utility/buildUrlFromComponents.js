/**
 * Constructs a URL string from the given URL components object.
 *
 * @param {Object} urlComponents - The object containing URL parts.
 * @param {string} urlComponents.scheme - The URL scheme (e.g., 'http', 'https').
 * @param {string} urlComponents.host - The host name or IP address.
 * @param {number|string|null} urlComponents.port - The port number (optional, can be null).
 * @returns {string} The constructed URL string, including scheme, host, and port if provided.
 */
function buildUrlFromComponents(urlComponents) {
  // Start with the scheme (e.g., 'http://')
  let url = urlComponents.scheme + '://';

  // Append the host using the external formatValueForDisplay function
  url += formatValueForDisplay(urlComponents.host);

  // If a port is specified (not null), append isBlobOrFileLikeObject
  if (urlComponents.port !== null) {
    url += ':' + urlComponents.port;
  }

  return url;
}

module.exports = buildUrlFromComponents;