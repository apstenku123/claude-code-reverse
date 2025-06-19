/**
 * Adds the __esModule flag to the provided module object and processes isBlobOrFileLikeObject with copyMissingPropertiesWithGetters.
 *
 * @param {object} moduleObject - The module object to which the __esModule flag will be added.
 * @returns {any} The result of processing the updated module object with copyMissingPropertiesWithGetters.
 */
const addEsModuleFlagAndProcess = (moduleObject) => {
  // Create a new object by copying the original module object and adding the __esModule property
  const moduleWithEsModuleFlag = DJ1(
    {},
    "__esModule",
    { value: true }
  );

  // Merge the original module object into the new object with the __esModule flag
  const mergedModuleObject = DJ1(moduleWithEsModuleFlag, moduleObject);

  // Process the merged module object with copyMissingPropertiesWithGetters and return the result
  return copyMissingPropertiesWithGetters(mergedModuleObject);
};

module.exports = addEsModuleFlagAndProcess;
