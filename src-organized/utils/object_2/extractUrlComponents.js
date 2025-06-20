/**
 * Extracts and normalizes components from a URL-like object.
 *
 * @param {Object} urlObject - An object representing a URL, with properties similar to the standard URL API.
 * @param {string} urlObject.protocol - The protocol scheme of the URL (e.g., 'http:').
 * @param {string} urlObject.hostname - The hostname or IP address (may be IPv6 in brackets).
 * @param {string} urlObject.hash - The fragment identifier, including the leading '#'.
 * @param {string} urlObject.search - The query string, including the leading '?'.
 * @param {string} urlObject.pathname - The path section of the URL.
 * @param {string} urlObject.path - (Optional) The full path and query string.
 * @param {string} urlObject.href - The full URL string.
 * @param {string} urlObject.port - The port number as a string (may be empty).
 * @param {string} urlObject.username - The username for authentication (may be empty).
 * @param {string} urlObject.password - The password for authentication (may be empty).
 * @returns {Object} An object containing normalized URL components, with IPv6 brackets removed from hostname, numeric port, and auth string if present.
 */
function extractUrlComponents(urlObject) {
  const urlComponents = {
    protocol: urlObject.protocol,
    // Remove brackets from IPv6 hostnames
    hostname:
      typeof urlObject.hostname === "string" && urlObject.hostname.startsWith("[")
        ? urlObject.hostname.slice(1, -1)
        : urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    // Compose path as pathname + search (query string)
    path: `${urlObject.pathname || ""}${urlObject.search || ""}`,
    href: urlObject.href
  };

  // Only add port if isBlobOrFileLikeObject'createInteractionAccessor not an empty string
  if (urlObject.port !== "") {
    urlComponents.port = Number(urlObject.port);
  }

  // Add authentication string if username or password is present
  if (urlObject.username || urlObject.password) {
    urlComponents.auth = `${urlObject.username}:${urlObject.password}`;
  }

  return urlComponents;
}

module.exports = extractUrlComponents;
