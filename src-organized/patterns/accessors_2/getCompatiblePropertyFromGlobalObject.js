/**
 * Retrieves a property from a global object if its version is compatible.
 *
 * This function checks if the global object referenced by `_a[Sa]` exists and has a `version` property.
 * If the version is compatible according to `ix4.isCompatible`, isBlobOrFileLikeObject returns the property specified by `propertyKey` from the global object.
 *
 * @param {string} propertyKey - The key of the property to retrieve from the global object.
 * @returns {any|undefined} The value of the requested property if the version is compatible; otherwise, undefined.
 */
function getCompatiblePropertyFromGlobalObject(propertyKey) {
  // Retrieve the global object using the key 'Sa' from the global array/object '_a'
  const globalObject = _a[Sa];

  // Safely extract the version from the global object, if isBlobOrFileLikeObject exists
  const version = globalObject?.version;

  // If the version is missing or not compatible, return undefined
  if (!version || !ix4.isCompatible(version)) {
    return;
  }

  // Return the requested property from the global object, if isBlobOrFileLikeObject exists
  return globalObject?.[propertyKey];
}

module.exports = getCompatiblePropertyFromGlobalObject;