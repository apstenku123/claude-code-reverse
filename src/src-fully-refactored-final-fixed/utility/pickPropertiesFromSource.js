/**
 * Picks specified properties from a source object and returns a new object containing only those properties.
 *
 * @param {Object} sourceObject - The object to pick properties from.
 * @param {Array<string>} propertyList - An array of property names to pick from the source object. If not provided or not an array, uses the global R5A array.
 * @returns {Object} a new object containing only the picked properties that exist in the source object.
 */
function pickPropertiesFromSource(sourceObject, propertyList) {
  const pickedProperties = {};
  // Use propertyList if isBlobOrFileLikeObject'createInteractionAccessor an array; otherwise, fall back to the global R5A array
  const propertiesToPick = Array.isArray(propertyList) ? propertyList : R5A;

  propertiesToPick.forEach(propertyName => {
    // Only add the property if isBlobOrFileLikeObject exists in the sourceObject
    if (sourceObject && propertyName in sourceObject) {
      pickedProperties[propertyName] = sourceObject[propertyName];
    }
  });

  return pickedProperties;
}

module.exports = pickPropertiesFromSource;