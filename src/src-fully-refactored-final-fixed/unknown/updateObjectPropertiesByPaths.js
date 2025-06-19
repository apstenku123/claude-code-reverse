/**
 * Updates properties within a root object based on provided property paths.
 * Handles special value types (infinity, nan, undefined) and clones/updates properties as needed.
 *
 * @param {Object} rootObject - The root object to update.
 * @param {Array<Array<string|number>>} specialValuePaths - Array of property paths (arrays of keys) to update with special values or descriptors.
 * @param {Array<Array<string|number>>} clonePaths - Array of property paths (arrays of keys) to clone and update.
 * @returns {Object} The updated root object.
 */
function updateObjectPropertiesByPaths(rootObject, specialValuePaths, clonePaths) {
  // Update properties with special values or descriptors
  specialValuePaths.forEach(function (propertyPath) {
    const pathLength = propertyPath.length;
    const propertyKey = propertyPath[pathLength - 1];
    // Get the parent object at the path (excluding the last key)
    const parentObject = getInObject(rootObject, propertyPath.slice(0, pathLength - 1));
    if (!parentObject || !Object.prototype.hasOwnProperty.call(parentObject, propertyKey)) return;
    const propertyValue = parentObject[propertyKey];
    if (!propertyValue) return;
    // Handle special value types
    if (propertyValue.type === "infinity") {
      parentObject[propertyKey] = Infinity;
    } else if (propertyValue.type === "nan") {
      parentObject[propertyKey] = NaN;
    } else if (propertyValue.type === "undefined") {
      parentObject[propertyKey] = undefined;
    } else {
      // Construct a new descriptor object with specific properties
      const descriptor = {};
      descriptor[G6.inspectable] = !!propertyValue.inspectable;
      descriptor[G6.inspected] = false;
      descriptor[G6.name] = propertyValue.name;
      descriptor[G6.preview_long] = propertyValue.preview_long;
      descriptor[G6.preview_short] = propertyValue.preview_short;
      descriptor[G6.size] = propertyValue.size;
      descriptor[G6.readonly] = !!propertyValue.readonly;
      descriptor[G6.type] = propertyValue.type;
      parentObject[propertyKey] = descriptor;
    }
  });

  // Clone and update properties at specified paths
  clonePaths.forEach(function (propertyPath) {
    const pathLength = propertyPath.length;
    const propertyKey = propertyPath[pathLength - 1];
    // Get the parent object at the path (excluding the last key)
    const parentObject = getInObject(rootObject, propertyPath.slice(0, pathLength - 1));
    if (!parentObject || !Object.prototype.hasOwnProperty.call(parentObject, propertyKey)) return;
    const propertyValue = parentObject[propertyKey];
    // Clone the property value
    const clonedValue = mergePropertiesWithDescriptors({}, propertyValue);
    // Apply additional updates to the cloned value
    resetAndCheckIfG3WasNonZero(clonedValue, propertyValue);
    parentObject[propertyKey] = clonedValue;
  });

  return rootObject;
}

module.exports = updateObjectPropertiesByPaths;