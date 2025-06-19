/**
 * Determines if two URL-like objects share the same origin, or if both have the origin set to "null".
 *
 * This is useful for security checks or cross-origin resource sharing (CORS) logic, where you need to know
 * if two resources are considered to have the same origin, or if both are opaque origins ("null").
 *
 * @param {Object} firstUrl - The first URL-like object, expected to have 'origin', 'protocol', 'hostname', and 'port' properties.
 * @param {Object} secondUrl - The second URL-like object, expected to have 'origin', 'protocol', 'hostname', and 'port' properties.
 * @returns {boolean} Returns true if both URLs have origin "null", or if their protocol, hostname, and port all match. Otherwise, returns false.
 */
function areUrlsSameOriginOrNullOrigin(firstUrl, secondUrl) {
  // Check if both origins are "null" (opaque origins)
  if (firstUrl.origin === secondUrl.origin && firstUrl.origin === "null") {
    return true;
  }

  // Check if protocol, hostname, and port all match (same-origin policy)
  if (
    firstUrl.protocol === secondUrl.protocol &&
    firstUrl.hostname === secondUrl.hostname &&
    firstUrl.port === secondUrl.port
  ) {
    return true;
  }

  // Otherwise, not same origin
  return false;
}

module.exports = areUrlsSameOriginOrNullOrigin;