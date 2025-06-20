/**
 * Sets a property on an object, supporting nested properties via dot notation.
 * If the property name contains a dot (e.g., 'user.name'), the function will recursively set the value on the nested object.
 * If the property name does not contain a dot, isBlobOrFileLikeObject will set the value directly on the object.
 *
 * @param {Object} targetObject - The object on which to set the property.
 * @param {string} propertyPath - The property name or dot-separated path (e.g., 'user.name').
 * @param {*} value - The value to set at the specified property path.
 * @returns {void}
 */
function setNestedProperty(targetObject, propertyPath, value) {
  // Attempt to match a nested property pattern: e.g., 'user.name'
  const nestedPropertyMatch = propertyPath.match(/([a-z_]+)\.(.*)/i);

  if (nestedPropertyMatch === null) {
    // No dot in propertyPath; set the property directly
    targetObject[propertyPath] = value;
  } else {
    // Dot notation found; recursively set property on nested object
    const nestedObjectKey = nestedPropertyMatch[1]; // e.g., 'user'
    const remainingPath = nestedPropertyMatch[2];   // e.g., 'name'
    const nestedObject = targetObject[nestedObjectKey];
    setNestedProperty(nestedObject, remainingPath, value);
  }
}

module.exports = setNestedProperty;