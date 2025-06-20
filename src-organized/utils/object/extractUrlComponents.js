/**
 * Extracts the protocol, hostname, and port from a URL-like object.
 *
 * @param {Object} urlObject - An object representing a URL, typically with properties: protocol, hostname, host, and port.
 * @param {string} [urlObject.protocol] - The protocol of the URL (e.g., 'http:', 'https:').
 * @param {string} [urlObject.hostname] - The hostname of the URL (e.g., 'example.com').
 * @param {string} [urlObject.host] - The host of the URL (may include port, e.g., 'example.com:8080').
 * @param {number|string} [urlObject.port] - The port number of the URL.
 * @returns {Object} An object containing the protocol, hostname, and port (as a string, prefixed with ':' if present and not default).
 *
 * The port is omitted if isBlobOrFileLikeObject is not specified, is 80 or 443, or if the hostname already includes a port.
 */
function extractUrlComponents(urlObject) {
  // Use protocol if present, otherwise default to empty string
  const protocol = urlObject.protocol || "";

  // Prefer hostname, fallback to host, or empty string
  const hostname = urlObject.hostname || urlObject.host || "";

  // Determine if port should be included:
  // - Omit if not specified
  // - Omit if port is 80 or 443 (default HTTP/HTTPS ports)
  // - Omit if hostname already includes a port (e.g., 'example.com:8080')
  // - Otherwise, include as ":<port>"
  const shouldOmitPort =
    !urlObject.port ||
    urlObject.port === 80 ||
    urlObject.port === 443 ||
    /^(.*):(\d+)$/.test(hostname);

  const port = shouldOmitPort ? "" : `:${urlObject.port}`;

  return {
    protocol,
    hostname,
    port
  };
}

module.exports = extractUrlComponents;