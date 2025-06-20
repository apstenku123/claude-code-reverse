/**
 * Adds the __esModule flag to the provided module object and processes isBlobOrFileLikeObject with copyMissingPropertiesWithGetters.
 *
 * This function creates a new object by copying all properties from the provided module object
 * and adding the `__esModule` property set to true. It then passes this new object to the `copyMissingPropertiesWithGetters` function
 * for further processing.
 *
 * @param {object} moduleObject - The module object to be wrapped with the __esModule flag.
 * @returns {any} The result of processing the wrapped module object with copyMissingPropertiesWithGetters.
 */
const wrapWithEsModuleFlag = (moduleObject) => {
  // Create a new object with all properties from moduleObject and set __esModule: true
  const moduleWithEsModuleFlag = ZJ1(
    {},
    "__esModule",
    { value: true }
  );
  // Copy properties from the original moduleObject
  const wrappedModule = ZJ1(moduleWithEsModuleFlag, moduleObject);
  // Process the wrapped module with copyMissingPropertiesWithGetters and return the result
  return copyMissingPropertiesWithGetters(wrappedModule);
};

module.exports = wrapWithEsModuleFlag;
