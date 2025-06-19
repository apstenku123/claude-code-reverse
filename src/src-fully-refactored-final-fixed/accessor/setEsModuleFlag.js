/**
 * Sets the __esModule property to true on a new object and merges isBlobOrFileLikeObject with the provided source object.
 *
 * @param {Object} sourceObject - The object to which the __esModule flag will be added and merged.
 * @returns {Object} a new object with the __esModule property set to true, merged with the source object.
 */
const setEsModuleFlag = (sourceObject) => {
  // Create a new object with __esModule property set to true
  const esModuleFlagObject = fQ1({}, "__esModule", { value: true });

  // Merge the esModuleFlagObject with the provided sourceObject using copyMissingPropertiesWithGetters
  return copyMissingPropertiesWithGetters(esModuleFlagObject, sourceObject);
};

module.exports = setEsModuleFlag;
