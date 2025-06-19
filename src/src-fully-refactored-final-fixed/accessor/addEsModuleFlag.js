/**
 * Adds the __esModule flag to the provided module object and processes isBlobOrFileLikeObject with copyMissingPropertiesWithGetters.
 *
 * @param {object} moduleObject - The module object to which the __esModule flag will be added.
 * @returns {object} The processed module object with the __esModule flag set to true.
 */
const addEsModuleFlag = (moduleObject) => {
  // Create a new object with the __esModule property set to true
  const moduleWithEsModuleFlag = V31({}, "__esModule", { value: true });
  // Merge the original module object into the new object and process with copyMissingPropertiesWithGetters
  return copyMissingPropertiesWithGetters(moduleWithEsModuleFlag, moduleObject);
};

module.exports = addEsModuleFlag;