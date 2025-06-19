/**
 * Creates a Map that associates each object'createInteractionAccessor `schemeId` property with the object itself.
 *
 * @param {Array<Object>} objectsWithSchemeId - An array of objects, each containing a `schemeId` property.
 * @returns {Map<string, Object>} a Map where each key is a `schemeId` and each value is the corresponding object.
 */
function mapSchemeIdsToObjects(objectsWithSchemeId) {
  // Initialize a new Map to hold the mapping from schemeId to object
  const schemeIdToObjectMap = new Map();

  // Iterate over each object in the input array
  for (const object of objectsWithSchemeId) {
    // Use the object'createInteractionAccessor schemeId as the key and the object itself as the value
    schemeIdToObjectMap.set(object.schemeId, object);
  }

  // Return the populated Map
  return schemeIdToObjectMap;
}

module.exports = mapSchemeIdsToObjects;
