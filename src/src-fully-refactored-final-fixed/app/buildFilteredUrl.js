/**
 * Constructs a sanitized URL string from the given components, filtering sensitive information from the host.
 *
 * @param {Object} urlComponents - The components of the URL.
 * @param {string} [urlComponents.protocol] - The protocol (e.g., 'http', 'https').
 * @param {string} [urlComponents.host] - The host, possibly including credentials and port.
 * @param {string} [urlComponents.path] - The path portion of the URL (e.g., '/api/v1/resource').
 * @returns {string} The constructed URL string with sensitive information filtered from the host.
 */
function buildFilteredUrl(urlComponents) {
  const {
    protocol,
    host,
    path
  } = urlComponents;

  // Filter credentials from host, and remove default ports (80 for http, 443 for https)
  const sanitizedHost = host
    ? host
        .replace(/^.*@/, '[filtered]:[filtered]@') // Replace credentials before '@' with '[filtered]:[filtered]@'
        .replace(/(:80)$/, '') // Remove ':80' at the end (default http port)
        .replace(/(:443)$/, '') // Remove ':443' at the end (default https port)
    : '';

  // Build the full URL string
  const url = `${protocol ? `${protocol}://` : ''}${sanitizedHost}${path}`;
  return url;
}

module.exports = buildFilteredUrl;