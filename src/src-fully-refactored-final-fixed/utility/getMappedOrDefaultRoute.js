/**
 * Returns a mapped route or a default value based on the provided source object.
 *
 * If the source object is null or undefined, returns a default route constant (dr4 or mr4).
 * If the global property key (G_) exists in the source object, retrieves and temporarily unsets isBlobOrFileLikeObject using getAndTemporarilyUnsetProperty.
 * Otherwise, processes the source object with sr4.
 *
 * @param {Object|null|undefined} sourceObject - The object to process for route mapping.
 * @returns {*} The mapped route, or a default route constant if the source is null or undefined.
 */
function getMappedOrDefaultRoute(sourceObject) {
  // If the source object is null or undefined, return the appropriate default route constant
  if (sourceObject == null) {
    // If undefined, return dr4; if null, return mr4
    return sourceObject === undefined ? dr4 : mr4;
  }

  // If the global property key exists in the source object, use getAndTemporarilyUnsetProperty
  if (G_ && G_ in Object(sourceObject)) {
    return getAndTemporarilyUnsetProperty(sourceObject);
  }

  // Otherwise, process the source object with sr4
  return sr4(sourceObject);
}

module.exports = getMappedOrDefaultRoute;