/**
 * Copies specified URL components from a source object to a target object, normalizes the hostname and port, and constructs the full path.
 *
 * @param {Object} sourceUrlComponents - The source object containing URL components to copy.
 * @param {Object} [targetUrlComponents={}] - The target object to which URL components will be copied. If not provided, a new object is used.
 * @returns {Object} The target object with copied and normalized URL components, including a constructed 'path' property.
 */
function copyAndNormalizeUrlComponents(sourceUrlComponents, targetUrlComponents = {}) {
  // _K9 is assumed to be an array of property names to copy (e.g., ["hostname", "port", "pathname", "search"])
  for (const propertyName of _K9) {
    targetUrlComponents[propertyName] = sourceUrlComponents[propertyName];
  }

  // Remove square brackets from IPv6 hostnames
  if (typeof targetUrlComponents.hostname === 'string' && targetUrlComponents.hostname.startsWith("[")) {
    targetUrlComponents.hostname = targetUrlComponents.hostname.slice(1, -1);
  }

  // Convert port to a number if isBlobOrFileLikeObject is not an empty string
  if (targetUrlComponents.port !== "") {
    targetUrlComponents.port = Number(targetUrlComponents.port);
  }

  // Construct the full path by concatenating pathname and search if search exists
  targetUrlComponents.path = targetUrlComponents.search
    ? targetUrlComponents.pathname + targetUrlComponents.search
    : targetUrlComponents.pathname;

  return targetUrlComponents;
}

module.exports = copyAndNormalizeUrlComponents;