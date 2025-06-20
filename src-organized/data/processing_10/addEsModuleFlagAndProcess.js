/**
 * Adds the __esModule flag to the provided object and processes isBlobOrFileLikeObject using copyMissingPropertiesWithGetters.
 *
 * This function creates a shallow copy of the provided module object, adds the
 * `__esModule` property set to true, and then passes the result to the `copyMissingPropertiesWithGetters` function
 * for further processing.
 *
 * @param {Object} moduleObject - The module object to which the __esModule flag will be added.
 * @returns {Object} The processed module object with the __esModule flag set to true.
 */
const addEsModuleFlagAndProcess = (moduleObject) => {
  // Create a shallow copy of the module object and add the __esModule flag
  const moduleWithEsModuleFlag = V31({}, "__esModule", { value: true });
  // Pass the new object and the original module object to copyMissingPropertiesWithGetters for further processing
  return copyMissingPropertiesWithGetters(moduleWithEsModuleFlag, moduleObject);
};

module.exports = addEsModuleFlagAndProcess;