/**
 * Restores special values (Infinity, NaN, undefined) and clones properties in a nested object structure.
 *
 * @param {Object} rootObject - The root object to modify.
 * @param {Array<Array<string|number>>} specialValuePaths - Array of paths (as arrays of keys) where special values should be restored.
 * @param {Array<Array<string|number>>} clonePaths - Array of paths (as arrays of keys) where properties should be shallow-cloned and processed.
 * @returns {Object} The modified root object.
 */
function restoreSpecialValuesAndCloneProperties(rootObject, specialValuePaths, clonePaths) {
  // Restore special values (Infinity, NaN, undefined) at specified paths
  specialValuePaths.forEach((path) => {
    const pathLength = path.length;
    const propertyKey = path[pathLength - 1];
    const parentObject = getInObject(rootObject, path.slice(0, pathLength - 1));
    if (!parentObject || !Object.prototype.hasOwnProperty.call(parentObject, propertyKey)) return;
    const propertyValue = parentObject[propertyKey];
    if (!propertyValue) return;
    // Handle special value restoration
    if (propertyValue.type === "infinity") {
      parentObject[propertyKey] = Infinity;
    } else if (propertyValue.type === "nan") {
      parentObject[propertyKey] = NaN;
    } else if (propertyValue.type === "undefined") {
      parentObject[propertyKey] = undefined;
    } else {
      // Rebuild the property with specific metadata properties
      const rebuiltProperty = {};
      rebuiltProperty[G6.inspectable] = Boolean(propertyValue.inspectable);
      rebuiltProperty[G6.inspected] = false;
      rebuiltProperty[G6.name] = propertyValue.name;
      rebuiltProperty[G6.preview_long] = propertyValue.preview_long;
      rebuiltProperty[G6.preview_short] = propertyValue.preview_short;
      rebuiltProperty[G6.size] = propertyValue.size;
      rebuiltProperty[G6.readonly] = Boolean(propertyValue.readonly);
      rebuiltProperty[G6.type] = propertyValue.type;
      parentObject[propertyKey] = rebuiltProperty;
    }
  });

  // Clone and process properties at specified paths
  clonePaths.forEach((path) => {
    const pathLength = path.length;
    const propertyKey = path[pathLength - 1];
    const parentObject = getInObject(rootObject, path.slice(0, pathLength - 1));
    if (!parentObject || !Object.prototype.hasOwnProperty.call(parentObject, propertyKey)) return;
    const originalValue = parentObject[propertyKey];
    // Shallow clone the property
    const clonedValue = mergePropertiesWithDescriptors({}, originalValue);
    // Apply additional processing to the cloned value
    resetAndCheckIfG3WasNonZero(clonedValue, originalValue);
    parentObject[propertyKey] = clonedValue;
  });

  return rootObject;
}

module.exports = restoreSpecialValuesAndCloneProperties;