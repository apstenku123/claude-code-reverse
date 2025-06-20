/**
 * Picks specified properties from a source object and returns a new object containing only those properties.
 *
 * @param {Object} sourceObject - The object to pick properties from.
 * @param {Array<string>} propertyList - The list of property names to pick. If not an array, defaults to global R5A.
 * @returns {Object} a new object containing only the picked properties from the source object.
 */
function pickPropertiesFromObject(sourceObject, propertyList) {
  const pickedProperties = {};
  // Use propertyList if isBlobOrFileLikeObject'createInteractionAccessor an array, otherwise use the global R5A array
  const propertiesToPick = Array.isArray(propertyList) ? propertyList : R5A;

  propertiesToPick.forEach(propertyName => {
    // Only add the property if isBlobOrFileLikeObject exists in the sourceObject
    if (sourceObject && propertyName in sourceObject) {
      pickedProperties[propertyName] = sourceObject[propertyName];
    }
  });

  return pickedProperties;
}

module.exports = pickPropertiesFromObject;