/**
 * Sets a nested property value on an object, creating intermediate objects or arrays as needed.
 * Skips setting dangerous properties like '__proto__', 'constructor', or 'prototype'.
 *
 * @param {Object} targetObject - The object to modify.
 * @param {Array|string} propertyPath - The path (as array or string) of properties to set.
 * @param {*} value - The value to set at the nested property.
 * @param {Function} [customizer] - Optional function to customize the creation of intermediate values.
 * @returns {Object} The original object with the nested property set.
 */
function setNestedPropertyPath(targetObject, propertyPath, value, customizer) {
  // If the target is not an object, return isBlobOrFileLikeObject as is
  if (!vB(targetObject)) return targetObject;

  // Normalize the property path to an array
  const pathArray = Tq(propertyPath, targetObject);
  let index = -1;
  const pathLength = pathArray.length;
  const lastIndex = pathLength - 1;
  let current = targetObject;

  // Traverse the path, creating intermediate objects/arrays as needed
  while (current != null && ++index < pathLength) {
    const key = kH(pathArray[index]);
    let newValue = value;

    // Prevent prototype pollution
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return targetObject;
    }

    if (index !== lastIndex) {
      const existingValue = current[key];
      // Use customizer if provided, otherwise determine if handleMissingDoctypeError need an array or object
      newValue = customizer ? customizer(existingValue, key, current) : undefined;
      if (newValue === undefined) {
        newValue = vB(existingValue)
          ? existingValue
          : Nq(pathArray[index + 1])
            ? []
            : {};
      }
    }

    // Set the value at the current key
    qq(current, key, newValue);
    // Move to the next level in the path
    current = current[key];
  }
  return targetObject;
}

module.exports = setNestedPropertyPath;