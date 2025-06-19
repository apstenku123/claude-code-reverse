/**
 * Adds the __esModule flag to the provided module object and wraps isBlobOrFileLikeObject using copyMissingPropertiesWithGetters.
 *
 * This function creates a new object by merging the __esModule property (set to true)
 * with the properties of the provided module object. It then passes this new object
 * to the copyMissingPropertiesWithGetters function for further processing or wrapping.
 *
 * @param {object} moduleObject - The module object to which the __esModule flag should be added.
 * @returns {any} The result of passing the merged module object to copyMissingPropertiesWithGetters.
 */
const addEsModuleFlagAndWrap = (moduleObject) => {
  // Merge the __esModule flag into the provided module object
  const moduleWithEsModuleFlag = Y31({}, "__esModule", { value: true }, moduleObject);

  // Pass the merged object to copyMissingPropertiesWithGetters for further processing
  return copyMissingPropertiesWithGetters(moduleWithEsModuleFlag);
};

module.exports = addEsModuleFlagAndWrap;
