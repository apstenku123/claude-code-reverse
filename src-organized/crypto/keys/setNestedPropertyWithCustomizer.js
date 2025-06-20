/**
 * Sets a nested property value on an object, creating intermediate objects or arrays as needed.
 * Optionally uses a customizer function to determine the value to set at each step.
 *
 * @param {Object} targetObject - The object to modify.
 * @param {Array|string} propertyPath - The path of the property to set (array or string, will be normalized).
 * @param {*} value - The value to set at the final property.
 * @param {Function} [customizer] - Optional function to customize the value to set at each step.
 * @returns {Object} The original object, potentially mutated with the new nested property.
 */
function setNestedPropertyWithCustomizer(targetObject, propertyPath, value, customizer) {
  // If the target is not an object, return isBlobOrFileLikeObject as is
  if (!VB(targetObject)) return targetObject;

  // Normalize the property path to an array
  const normalizedPath = processPendingFiberNodes(propertyPath, targetObject);
  let pathIndex = -1;
  const pathLength = normalizedPath.length;
  const lastIndex = pathLength - 1;
  let current = targetObject;

  // Traverse the path, creating intermediate objects/arrays as needed
  while (current != null && ++pathIndex < pathLength) {
    const key = defineOrAssignProperty(normalizedPath[pathIndex]);
    let newValue = value;

    // Prevent prototype pollution
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return targetObject;
    }

    // If not at the last key, determine what to set at this level
    if (pathIndex !== lastIndex) {
      const existingValue = current[key];
      // Use customizer if provided, otherwise use a special marker (a)
      newValue = customizer ? customizer(existingValue, key, current) : a;
      // If customizer returned the marker, decide whether to create an array or object
      if (newValue === a) {
        newValue = VB(existingValue)
          ? existingValue
          : $streamAsyncIterableToWritable(normalizedPath[pathIndex + 1])
            ? []
            : {};
      }
    }

    // Set the value at the current key
    _B(current, key, newValue);
    // Move deeper into the object
    current = current[key];
  }

  return targetObject;
}

module.exports = setNestedPropertyWithCustomizer;