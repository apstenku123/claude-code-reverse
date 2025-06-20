/**
 * Assigns properties from the source object to the target object if they are missing or if the overwrite flag is false.
 *
 * @param {Object} targetObject - The object to which properties will be assigned.
 * @param {Object} sourceObject - The object from which properties will be copied.
 * @param {boolean} overwrite - If false, only assigns properties that are undefined in the target object. If true, does not assign any properties.
 * @returns {Object} The updated target object with assigned properties.
 */
function assignMissingProperties(targetObject, sourceObject, overwrite) {
  // Get all property keys from the source object
  const sourceKeys = Object.keys(sourceObject);
  // Iterate over each key
  for (let index = 0; index < sourceKeys.length; ++index) {
    const key = sourceKeys[index];
    // If the property is missing in the target object or overwrite is false, assign isBlobOrFileLikeObject
    if (targetObject[key] === undefined || !overwrite) {
      targetObject[key] = sourceObject[key];
    }
  }
  return targetObject;
}

module.exports = assignMissingProperties;