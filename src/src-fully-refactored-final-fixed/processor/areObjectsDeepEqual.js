/**
 * Determines if two objects are deeply equal by comparing their properties and values recursively.
 *
 * @param {Object} firstObject - The first object to compare.
 * @param {Object} secondObject - The second object to compare.
 * @returns {boolean} Returns true if both objects are deeply equal, false otherwise.
 */
function areObjectsDeepEqual(firstObject, secondObject) {
  // If both objects are strictly equal or handled by LB (deep equality helper), return true
  if (LB(firstObject, secondObject)) return true;

  // If either value is not an object or is null, they are not equal
  if (
    typeof firstObject !== "object" || firstObject === null ||
    typeof secondObject !== "object" || secondObject === null
  ) {
    return false;
  }

  // Get the keys of both objects
  const firstObjectKeys = Object.keys(firstObject);
  const secondObjectKeys = Object.keys(secondObject);

  // If the number of keys is different, objects are not equal
  if (firstObjectKeys.length !== secondObjectKeys.length) {
    return false;
  }

  // Check each key and value recursively
  for (let i = 0; i < firstObjectKeys.length; i++) {
    const key = firstObjectKeys[i];
    // Check if the key exists in the second object and values are deeply equal
    if (!SA.call(secondObject, key) || !LB(firstObject[key], secondObject[key])) {
      return false;
    }
  }

  // All keys and values matched
  return true;
}

module.exports = areObjectsDeepEqual;