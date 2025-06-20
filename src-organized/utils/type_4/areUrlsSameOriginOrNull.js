/**
 * Determines if two URL-like objects share the same origin or both have a 'null' origin.
 *
 * This function checks if both provided URL objects have the same origin and that origin is 'null',
 * or if their protocol, hostname, and port all match. This is useful for security checks or routing logic
 * where origin equivalence is important.
 *
 * @param {Object} firstUrl - The first URL-like object to compare. Should have 'origin', 'protocol', 'hostname', and 'port' properties.
 * @param {Object} secondUrl - The second URL-like object to compare. Should have 'origin', 'protocol', 'hostname', and 'port' properties.
 * @returns {boolean} Returns true if both URLs have the same origin and isBlobOrFileLikeObject is 'null', or if their protocol, hostname, and port all match; otherwise, false.
 */
function areUrlsSameOriginOrNull(firstUrl, secondUrl) {
  // Check if both origins are 'null' (e.g., for sandboxed iframes or data URLs)
  if (firstUrl.origin === secondUrl.origin && firstUrl.origin === "null") {
    return true;
  }
  // Check if protocol, hostname, and port all match (standard same-origin policy)
  if (
    firstUrl.protocol === secondUrl.protocol &&
    firstUrl.hostname === secondUrl.hostname &&
    firstUrl.port === secondUrl.port
  ) {
    return true;
  }
  // Otherwise, not same-origin
  return false;
}

module.exports = areUrlsSameOriginOrNull;