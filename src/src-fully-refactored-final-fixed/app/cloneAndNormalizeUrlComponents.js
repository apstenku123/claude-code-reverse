/**
 * Clones selected URL components from a source object into a new or existing target object,
 * normalizes the hostname and port, and constructs the path property.
 *
 * @param {Object} sourceUrlComponents - The source object containing URL component properties.
 * @param {Object} [targetUrlComponents={}] - Optional target object to clone properties into.
 * @returns {Object} The target object with cloned and normalized URL components.
 */
function cloneAndNormalizeUrlComponents(sourceUrlComponents, targetUrlComponents = {}) {
  // _K9 is assumed to be an array of property names to copy (e.g., ['hostname', 'port', 'pathname', 'search', ...])
  for (const propertyName of _K9) {
    targetUrlComponents[propertyName] = sourceUrlComponents[propertyName];
  }

  // Remove square brackets from IPv6 hostnames
  if (typeof targetUrlComponents.hostname === 'string' && targetUrlComponents.hostname.startsWith("[")) {
    targetUrlComponents.hostname = targetUrlComponents.hostname.slice(1, -1);
  }

  // Convert port to a number if isBlobOrFileLikeObject'createInteractionAccessor a non-empty string
  if (targetUrlComponents.port !== "") {
    targetUrlComponents.port = Number(targetUrlComponents.port);
  }

  // Construct the 'path' property by concatenating pathname and search if search exists
  targetUrlComponents.path = targetUrlComponents.search
    ? targetUrlComponents.pathname + targetUrlComponents.search
    : targetUrlComponents.pathname;

  return targetUrlComponents;
}

module.exports = cloneAndNormalizeUrlComponents;