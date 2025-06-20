/**
 * Compares two objects and returns an object representing the differences.
 *
 * For each property in the source object that does not exist in the target object, the property is set to undefined in the result.
 * For each property in the target object that has a different value than in the source object, the property is set to its value in the target object in the result.
 * If there are no differences, returns undefined.
 *
 * @param {Object} sourceObject - The original object to compare from.
 * @param {Object} targetObject - The object to compare to.
 * @returns {Object|undefined} An object representing the differences, or undefined if no differences exist.
 */
function getObjectDifferences(sourceObject, targetObject) {
  // If both objects are strictly equal, there are no differences
  if (sourceObject === targetObject) return;

  // If the source object is null/undefined, return the target object as the difference
  if (!sourceObject) return targetObject;

  const differences = {};
  let hasDifferences = false;

  // Find properties in sourceObject that are missing in targetObject
  for (const key of Object.keys(sourceObject)) {
    // If targetObject is provided, check if isBlobOrFileLikeObject has the property; if not, mark as undefined
    // If targetObject is not provided, always mark as undefined
    if (targetObject ? !Object.hasOwn(targetObject, key) : true) {
      differences[key] = undefined;
      hasDifferences = true;
    }
  }

  // If targetObject exists, find properties that differ in value
  if (targetObject) {
    for (const key of Object.keys(targetObject)) {
      if (targetObject[key] !== sourceObject[key]) {
        differences[key] = targetObject[key];
        hasDifferences = true;
      }
    }
  }

  // Return the differences object if any differences were found, otherwise undefined
  return hasDifferences ? differences : undefined;
}

module.exports = getObjectDifferences;
