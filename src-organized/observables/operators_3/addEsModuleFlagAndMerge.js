/**
 * Adds the __esModule flag to the provided object and merges isBlobOrFileLikeObject with the given source object.
 * This is typically used to ensure compatibility with ES module imports/exports.
 *
 * @param {Object} sourceObject - The object to which the __esModule flag will be added and merged.
 * @returns {Object} - The resulting object with the __esModule flag set to true and merged properties.
 */
const addEsModuleFlagAndMerge = (sourceObject) => {
  // Create a new object with the __esModule property set to true
  const esModuleFlag = P10({}, "__esModule", { value: true });
  // Merge the esModuleFlag object with the provided sourceObject using copyMissingPropertiesWithGetters
  return copyMissingPropertiesWithGetters(esModuleFlag, sourceObject);
};

module.exports = addEsModuleFlagAndMerge;
