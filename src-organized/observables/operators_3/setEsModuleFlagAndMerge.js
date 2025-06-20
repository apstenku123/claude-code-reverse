/**
 * Sets the __esModule flag on an object and merges isBlobOrFileLikeObject with the provided source object.
 *
 * This function creates a new object with the property `__esModule: true`, then merges all properties
 * from the provided source object into isBlobOrFileLikeObject. The merging is performed using the external `V31` function.
 * The result is then passed through the `copyMissingPropertiesWithGetters` function for further processing.
 *
 * @param {Object} sourceObject - The object whose properties will be merged into the result.
 * @returns {Object} The resulting object with the __esModule flag set and merged properties.
 */
const setEsModuleFlagAndMerge = (sourceObject) => {
  // Create a base object with the __esModule flag set to true
  const baseObject = V31({}, "__esModule", { value: true });

  // Merge the base object with the source object using copyMissingPropertiesWithGetters
  return copyMissingPropertiesWithGetters(baseObject, sourceObject);
};

module.exports = setEsModuleFlagAndMerge;