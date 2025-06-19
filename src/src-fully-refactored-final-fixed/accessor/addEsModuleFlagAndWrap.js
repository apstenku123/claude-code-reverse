/**
 * Adds the __esModule flag to the provided object and wraps isBlobOrFileLikeObject using copyMissingPropertiesWithGetters.
 *
 * This function creates a new object with the __esModule property set to true,
 * merges isBlobOrFileLikeObject with the provided source object, and then passes the result to the copyMissingPropertiesWithGetters function.
 *
 * @param {Object} sourceObject - The object to which the __esModule flag will be added and then wrapped.
 * @returns {Object} The result of passing the merged object to copyMissingPropertiesWithGetters.
 */
const addEsModuleFlagAndWrap = (sourceObject) => {
  // Merge the __esModule flag into the source object
  const objectWithEsModuleFlag = AQ1({}, "__esModule", { value: true });

  // Pass the merged object and the original source object to copyMissingPropertiesWithGetters
  return copyMissingPropertiesWithGetters(objectWithEsModuleFlag, sourceObject);
};

module.exports = addEsModuleFlagAndWrap;
