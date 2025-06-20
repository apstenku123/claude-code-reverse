/**
 * Wraps the provided module export with an __esModule property set to true, 
 * indicating that the export is an ES module. Passes the result to the copyMissingPropertiesWithGetters function for further processing.
 *
 * @param {any} moduleExport - The module export to be wrapped and processed.
 * @returns {any} The result of passing the ES module-wrapped export to copyMissingPropertiesWithGetters.
 */
const createEsModuleExport = (moduleExport) => {
  // Create a new object with __esModule: true and merge in the provided export
  const esModuleExport = h81({}, "__esModule", { value: true });
  // Pass the ES module export and the original export to copyMissingPropertiesWithGetters for further processing
  return copyMissingPropertiesWithGetters(esModuleExport, moduleExport);
};

module.exports = createEsModuleExport;
