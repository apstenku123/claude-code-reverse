/**
 * Determines if two connection configuration objects are equivalent.
 *
 * This function compares two configuration objects, which may represent either a host/port pair or a path.
 * If both are null/undefined, returns true. If only one is null/undefined, returns false.
 * If both are host/port objects, compares their host and port properties.
 * If both are path objects, compares their path properties.
 *
 * @param {Object|null|undefined} configA - The first connection configuration object to compare. Can be a host/port object or a path object.
 * @param {Object|null|undefined} configB - The second connection configuration object to compare. Can be a host/port object or a path object.
 * @returns {boolean} True if the two configuration objects are considered equal, false otherwise.
 */
function areConnectionConfigsEqual(configA, configB) {
  // If both configs are null or undefined, they are considered equal
  if (!configA && !configB) {
    return true;
  }

  // If only one is null or undefined, they are not equal
  if (!configA || !configB) {
    return false;
  }

  // If configA is a host/port object
  if (hasPortProperty(configA)) {
    // Both must be host/port objects and have matching host and port
    return hasPortProperty(configB) && configA.host === configB.host && configA.port === configB.port;
  } else {
    // Otherwise, both must be path objects and have matching path
    return !hasPortProperty(configB) && configA.path === configB.path;
  }
}

module.exports = areConnectionConfigsEqual;