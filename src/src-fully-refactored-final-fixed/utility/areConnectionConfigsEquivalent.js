/**
 * Determines whether two connection configuration objects are equivalent.
 *
 * This utility function compares two configuration objects, which may represent either
 * host/port-based or path-based connections. The comparison logic is as follows:
 *
 * - If both configs are null/undefined, they are considered equivalent.
 * - If only one is null/undefined, they are not equivalent.
 * - If both are host/port-based (as determined by hasPortProperty), compare their host and port properties.
 * - If both are path-based (i.e., not host/port-based), compare their path properties.
 *
 * @param {Object|null|undefined} configA - The first connection configuration object to compare.
 * @param {Object|null|undefined} configB - The second connection configuration object to compare.
 * @returns {boolean} True if the configurations are equivalent, false otherwise.
 */
function areConnectionConfigsEquivalent(configA, configB) {
  // If both configs are null or undefined, they are equivalent
  if (!configA && !configB) return true;

  // If only one is null or undefined, they are not equivalent
  if (!configA || !configB) return false;

  // If configA is host/port-based
  if (hasPortProperty(configA)) {
    // Both must be host/port-based and have matching host and port
    return hasPortProperty(configB) && configA.host === configB.host && configA.port === configB.port;
  } else {
    // Both must be path-based and have matching path
    return !hasPortProperty(configB) && configA.path === configB.path;
  }
}

module.exports = areConnectionConfigsEquivalent;