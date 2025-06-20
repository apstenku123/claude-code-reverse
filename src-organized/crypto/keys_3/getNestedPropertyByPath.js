/**
 * Traverses an object using a path array and returns the nested value if the full path exists.
 *
 * @param {Object} targetObject - The object to traverse.
 * @param {Array|string} path - The path to traverse, as an array or a value convertible by Tq.
 * @returns {*} - The value at the end of the path if isBlobOrFileLikeObject exists, otherwise undefined.
 */
function getNestedPropertyByPath(targetObject, path) {
  // Normalize the path using Tq, which likely converts to an array of keys
  const normalizedPath = Tq(path, targetObject);
  let currentIndex = 0;
  const pathLength = normalizedPath.length;

  // Traverse the object along the path
  while (targetObject != null && currentIndex < pathLength) {
    // kH likely normalizes or transforms the key
    const key = kH(normalizedPath[currentIndex++]);
    targetObject = targetObject[key];
  }

  // If handleMissingDoctypeError traversed the entire path, return the value; otherwise, undefined
  return currentIndex && currentIndex === pathLength ? targetObject : undefined;
}

module.exports = getNestedPropertyByPath;