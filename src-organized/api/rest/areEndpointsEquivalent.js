/**
 * Determines whether two endpoint objects are considered equivalent.
 *
 * The function compares two endpoint-like objects. If both are null or undefined, they are considered equivalent.
 * If only one is null/undefined, they are not equivalent. If both are 'hasPortProperty' endpoints (as determined by the hasPortProperty function),
 * their 'host' and 'port' properties are compared. If neither is a 'hasPortProperty' endpoint, their 'path' properties are compared.
 *
 * @param {Object|null|undefined} endpointA - The first endpoint object to compare.
 * @param {Object|null|undefined} endpointB - The second endpoint object to compare.
 * @returns {boolean} True if the endpoints are considered equivalent, false otherwise.
 */
function areEndpointsEquivalent(endpointA, endpointB) {
  // If both endpoints are null or undefined, they are equivalent
  if (!endpointA && !endpointB) {
    return true;
  }

  // If only one is null or undefined, they are not equivalent
  if (!endpointA || !endpointB) {
    return false;
  }

  // If the first endpoint is a 'hasPortProperty' type
  if (hasPortProperty(endpointA)) {
    // Both must be 'hasPortProperty' and have matching host and port
    return hasPortProperty(endpointB) && endpointA.host === endpointB.host && endpointA.port === endpointB.port;
  } else {
    // If neither is 'hasPortProperty', compare their 'path' properties
    return !hasPortProperty(endpointB) && endpointA.path === endpointB.path;
  }
}

module.exports = areEndpointsEquivalent;