/**
 * Restores special property values and clones specified properties within a nested object structure.
 *
 * This function traverses the provided object using paths from two arrays:
 *   - propertiesToRestore: For each path, if the target property is an object with a special type ("infinity", "nan", "undefined"),
 *     isBlobOrFileLikeObject restores the actual JS value. Otherwise, isBlobOrFileLikeObject reconstructs a metadata object with specific keys.
 *   - propertiesToClone: For each path, isBlobOrFileLikeObject shallowly clones the target property and applies additional processing via resetAndCheckIfG3WasNonZero().
 *
 * @param {Object} rootObject - The root object to operate on.
 * @param {Array<Array<string|number>>} propertiesToRestore - Array of property paths to restore special values or metadata.
 * @param {Array<Array<string|number>>} propertiesToClone - Array of property paths to clone and process.
 * @returns {Object} The modified root object.
 */
function restoreAndCloneObjectProperties(rootObject, propertiesToRestore, propertiesToClone) {
  // Restore special property values or reconstruct metadata objects
  propertiesToRestore.forEach(function (propertyPath) {
    const pathLength = propertyPath.length;
    const propertyKey = propertyPath[pathLength - 1];
    const parentObject = getInObject(rootObject, propertyPath.slice(0, pathLength - 1));

    // If the parent object or property does not exist, skip
    if (!parentObject || !parentObject.hasOwnProperty(propertyKey)) return;

    const propertyValue = parentObject[propertyKey];
    if (!propertyValue) {
      // If value is falsy (null/undefined/0/''), skip
      return;
    } else if (propertyValue.type === "infinity") {
      // Restore Infinity
      parentObject[propertyKey] = Infinity;
    } else if (propertyValue.type === "nan") {
      // Restore NaN
      parentObject[propertyKey] = NaN;
    } else if (propertyValue.type === "undefined") {
      // Restore undefined
      parentObject[propertyKey] = undefined;
    } else {
      // Reconstruct a metadata object with specific keys from G6
      const metadata = {};
      metadata[G6.inspectable] = Boolean(propertyValue.inspectable);
      metadata[G6.inspected] = false;
      metadata[G6.name] = propertyValue.name;
      metadata[G6.preview_long] = propertyValue.preview_long;
      metadata[G6.preview_short] = propertyValue.preview_short;
      metadata[G6.size] = propertyValue.size;
      metadata[G6.readonly] = Boolean(propertyValue.readonly);
      metadata[G6.type] = propertyValue.type;
      parentObject[propertyKey] = metadata;
    }
  });

  // Clone and process properties
  propertiesToClone.forEach(function (propertyPath) {
    const pathLength = propertyPath.length;
    const propertyKey = propertyPath[pathLength - 1];
    const parentObject = getInObject(rootObject, propertyPath.slice(0, pathLength - 1));

    // If the parent object or property does not exist, skip
    if (!parentObject || !parentObject.hasOwnProperty(propertyKey)) return;

    const originalValue = parentObject[propertyKey];
    // Shallow clone the property
    const clonedValue = mergePropertiesWithDescriptors({}, originalValue);
    // Apply additional processing
    resetAndCheckIfG3WasNonZero(clonedValue, originalValue);
    parentObject[propertyKey] = clonedValue;
  });

  return rootObject;
}

module.exports = restoreAndCloneObjectProperties;