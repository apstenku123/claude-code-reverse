/**
 * Adds the __esModule flag to an object and extends isBlobOrFileLikeObject with the provided properties.
 *
 * This function creates a new object with the __esModule property set to true, then merges
 * all properties from the provided source object into isBlobOrFileLikeObject. The resulting object is then passed
 * to the copyMissingPropertiesWithGetters function for further processing.
 *
 * @param {Object} sourceObject - The object whose properties will be merged into the result.
 * @returns {any} The result of passing the merged object to copyMissingPropertiesWithGetters.
 */
const addEsModuleFlagAndExtend = (sourceObject) => {
  // Create a new object with __esModule: true, then merge in all properties from sourceObject
  const objectWithEsModuleFlag = LX1({}, "__esModule", { value: true });
  // Pass the merged object and the source object to copyMissingPropertiesWithGetters for further processing
  return copyMissingPropertiesWithGetters(objectWithEsModuleFlag, sourceObject);
};

module.exports = addEsModuleFlagAndExtend;
