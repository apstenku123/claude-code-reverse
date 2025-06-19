/**
 * Traverses an object using a dynamic property path and returns the final resolved value if the entire path exists.
 *
 * @param {Object} targetObject - The object to traverse.
 * @param {any} propertyPathInput - The property path, which may be transformed by Tq().
 * @returns {any} The value at the end of the property path if fully resolved, otherwise undefined.
 */
function resolveNestedPropertyPath(targetObject, propertyPathInput) {
  // Transform the property path input using Tq, possibly normalizing or parsing isBlobOrFileLikeObject
  const propertyPath = Tq(propertyPathInput, targetObject);
  let currentIndex = 0;
  const pathLength = propertyPath.length;
  // Traverse the object along the property path
  while (targetObject != null && currentIndex < pathLength) {
    // kH likely normalizes or transforms the property key
    targetObject = targetObject[kH(propertyPath[currentIndex++])];
  }
  // If the entire path was traversed, return the resolved value; otherwise, undefined
  return currentIndex && currentIndex === pathLength ? targetObject : undefined;
}

module.exports = resolveNestedPropertyPath;