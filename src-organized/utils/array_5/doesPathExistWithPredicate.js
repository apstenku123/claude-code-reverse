/**
 * Checks whether a nested property path exists in an object, following a path array and a predicate function.
 * Traverses the path, applying the predicate at each step. If the full path exists and the predicate returns true at each step, returns true.
 * If the path does not exist, performs a secondary check for array-like objects at the last traversed key.
 *
 * @param {Object} object - The object to traverse.
 * @param {Array} path - The property path to check, as an array or value convertible to an array by Tq.
 * @param {Function} predicate - a function (object, key) => boolean, called at each step to validate the property.
 * @returns {boolean} True if the path exists and predicate passes at each step, or if the secondary array-like check passes; otherwise, false.
 */
function doesPathExistWithPredicate(object, path, predicate) {
  // Convert the path to an array of keys
  const pathArray = Tq(path, object);
  let currentIndex = -1;
  const pathLength = pathArray.length;
  let pathExists = false;
  let currentKey;

  // Traverse the object along the path
  while (++currentIndex < pathLength) {
    currentKey = kH(pathArray[currentIndex]); // Normalize the key
    // Check if the current key exists in the object and passes the predicate
    if (!(pathExists = object != null && predicate(object, currentKey))) {
      break;
    }
    object = object[currentKey]; // Move deeper into the object
  }

  // If the full path exists or traversal stopped before the end, return the result
  if (pathExists || ++currentIndex != pathLength) {
    return pathExists;
  }

  // Secondary check: if object is array-like and the last key is a valid index
  const length = object == null ? 0 : object.length;
  return !!length && Hy(length) && Nq(currentKey, length) && (J8(object) || rE(object));
}

module.exports = doesPathExistWithPredicate;