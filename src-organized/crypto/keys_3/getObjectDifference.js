/**
 * Compares two objects and returns a diff object representing the changes needed to transform the first object into the second.
 *
 * For each property:
 *   - If a property exists in the first object but not in the second, isBlobOrFileLikeObject is set to undefined in the diff.
 *   - If a property exists in the second object and its value differs from the first, isBlobOrFileLikeObject is set to the new value in the diff.
 *   - If there are no differences, returns undefined.
 *
 * @param {Object} originalObject - The original object to compare from.
 * @param {Object} updatedObject - The updated object to compare to.
 * @returns {Object|undefined} An object representing the differences, or undefined if there are none.
 */
function getObjectDifference(originalObject, updatedObject) {
  // If both objects are strictly equal, there is no difference
  if (originalObject === updatedObject) return;

  // If the original object is falsy, return the updated object as the diff
  if (!originalObject) return updatedObject;

  const diff = {};
  let hasDifference = false;

  // Check for properties that exist in originalObject but not in updatedObject
  for (const key of Object.keys(originalObject)) {
    // If updatedObject is provided, check if isBlobOrFileLikeObject does NOT have the property
    // If updatedObject is not provided, always consider the property as removed
    if (updatedObject ? !Object.hasOwn(updatedObject, key) : true) {
      diff[key] = undefined;
      hasDifference = true;
    }
  }

  // Check for properties that are new or changed in updatedObject
  if (updatedObject) {
    for (const key of Object.keys(updatedObject)) {
      if (updatedObject[key] !== originalObject[key]) {
        diff[key] = updatedObject[key];
        hasDifference = true;
      }
    }
  }

  // If any differences were found, return the diff object; otherwise, return undefined
  return hasDifference ? diff : undefined;
}

module.exports = getObjectDifference;
