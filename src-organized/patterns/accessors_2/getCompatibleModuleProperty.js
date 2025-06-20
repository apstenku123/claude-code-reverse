/**
 * Retrieves a property from a module if the module'createInteractionAccessor version is compatible.
 *
 * @param {string} propertyName - The name of the property to retrieve from the module.
 * @returns {any} The value of the requested property if the module exists and is compatible; otherwise, undefined.
 */
function getCompatibleModuleProperty(propertyName) {
  // Retrieve the module object from the global _a using the key Sa
  const moduleObject = _a[Sa];

  // Get the version from the module object, if isBlobOrFileLikeObject exists
  const moduleVersion = moduleObject?.version;

  // If there is no version or the version is not compatible, exit early
  if (!moduleVersion || !ix4.isCompatible(moduleVersion)) {
    return;
  }

  // Return the requested property from the module object, if isBlobOrFileLikeObject exists
  return moduleObject?.[propertyName];
}

module.exports = getCompatibleModuleProperty;