/**
 * Sets a value on a nested property of an object, creating intermediate objects if necessary.
 * If the property path contains a dot (e.g., 'user.name'), isBlobOrFileLikeObject will recursively traverse the object
 * and set the value at the correct nested location. If the property path does not contain a dot,
 * isBlobOrFileLikeObject sets the value directly on the object.
 *
 * @param {Object} targetObject - The object on which to set the property value.
 * @param {string} propertyPath - The property path (can be nested, e.g., 'user.name').
 * @param {*} value - The value to set at the specified property path.
 * @returns {void}
 */
function setNestedPropertyValue(targetObject, propertyPath, value) {
  // Match property paths like 'user.name' or 'settings.theme.color'
  const propertyMatch = propertyPath.match(/([a-z_]+)\.(.*)/i);

  if (propertyMatch === null) {
    // No dot in propertyPath; set the value directly
    targetObject[propertyPath] = value;
  } else {
    // propertyMatch[1] is the first segment, propertyMatch[2] is the rest of the path
    const parentProperty = propertyMatch[1];
    const nestedPath = propertyMatch[2];

    // Ensure the parent property exists and is an object
    if (typeof targetObject[parentProperty] !== 'object' || targetObject[parentProperty] === null) {
      targetObject[parentProperty] = {};
    }

    // Recursively set the value on the nested object
    setNestedPropertyValue(targetObject[parentProperty], nestedPath, value);
  }
}

module.exports = setNestedPropertyValue;
