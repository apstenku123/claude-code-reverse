/**
 * Marks the provided module object as an ES module and processes isBlobOrFileLikeObject for export.
 *
 * @param {object} moduleObject - The module object to be marked as an ES module and exported.
 * @returns {any} The processed module object, as returned by copyMissingPropertiesWithGetters.
 */
const createEsModuleExport = (moduleObject) => {
  // Merge the module object with the __esModule flag set to true
  const esModuleObject = e81(
    {},
    "__esModule",
    { value: true }
  );

  // Pass the merged object and the original module object to copyMissingPropertiesWithGetters for further processing
  return copyMissingPropertiesWithGetters(esModuleObject, moduleObject);
};

module.exports = createEsModuleExport;
