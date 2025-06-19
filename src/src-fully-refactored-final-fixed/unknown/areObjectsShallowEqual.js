/**
 * Determines if two objects have the same set of keys and corresponding values (shallow equality).
 *
 * @param {Object} firstObject - The first object to compare.
 * @param {Object} secondObject - The second object to compare.
 * @returns {boolean} True if both objects have the same keys and values, false otherwise.
 */
function areObjectsShallowEqual(firstObject, secondObject) {
  // Get sorted arrays of the objects' keys
  const firstObjectKeys = Object.keys(firstObject).sort();
  const secondObjectKeys = Object.keys(secondObject).sort();

  // If the number of keys is different, objects are not equal
  if (firstObjectKeys.length !== secondObjectKeys.length) {
    return false;
  }

  // Compare each key and corresponding value
  for (let index = 0; index < firstObjectKeys.length; index += 1) {
    const keyFromFirst = firstObjectKeys[index];
    const keyFromSecond = secondObjectKeys[index];

    // If keys at the same position differ, objects are not equal
    if (keyFromFirst !== keyFromSecond) {
      return false;
    }

    // If values for the current key differ, objects are not equal
    if (firstObject[keyFromFirst] !== secondObject[keyFromSecond]) {
      return false;
    }
  }

  // All keys and values match
  return true;
}

module.exports = areObjectsShallowEqual;