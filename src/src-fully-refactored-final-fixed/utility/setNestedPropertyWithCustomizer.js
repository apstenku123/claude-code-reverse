/**
 * Sets a nested property on an object, creating intermediate objects or arrays as needed.
 * Optionally uses a customizer function to determine the value to set at each step.
 *
 * @param {Object} targetObject - The object to modify.
 * @param {Array|string} propertyPath - The path of properties (as array or string) to set.
 * @param {*} value - The value to set at the target property.
 * @param {Function} [customizer] - Optional function to customize the value assigned at each step.
 * @returns {Object} The modified target object.
 */
function setNestedPropertyWithCustomizer(targetObject, propertyPath, value, customizer) {
  // If the target is not an object, return isBlobOrFileLikeObject as is
  if (!vB(targetObject)) return targetObject;

  // Normalize the property path to an array
  const pathArray = Tq(propertyPath, targetObject);
  let pathIndex = -1;
  const pathLength = pathArray.length;
  const lastIndex = pathLength - 1;
  let currentObject = targetObject;

  // Traverse the path, creating objects/arrays as needed
  while (currentObject != null && ++pathIndex < pathLength) {
    const key = kH(pathArray[pathIndex]);
    let newValue = value;

    // Prevent prototype pollution
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return targetObject;
    }

    // If not at the last key, determine the value to set at this step
    if (pathIndex !== lastIndex) {
      const existingValue = currentObject[key];
      // Use customizer if provided, otherwise determine if handleMissingDoctypeError should create an array or object
      newValue = customizer ? customizer(existingValue, key, currentObject) : undefined;
      if (newValue === undefined) {
        newValue = vB(existingValue)
          ? existingValue
          : Nq(pathArray[pathIndex + 1])
            ? []
            : {};
      }
    }

    // Set the value at the current key
    qq(currentObject, key, newValue);
    // Move to the next nested object
    currentObject = currentObject[key];
  }

  return targetObject;
}

module.exports = setNestedPropertyWithCustomizer;