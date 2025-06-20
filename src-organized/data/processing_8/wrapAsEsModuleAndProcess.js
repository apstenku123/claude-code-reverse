/**
 * Wraps the provided module/object as an ES module and processes isBlobOrFileLikeObject with copyPropertiesWithGetters.
 *
 * This function creates a shallow copy of the input object/module, adds the `__esModule` property (set to true),
 * and then passes the resulting object to the `copyPropertiesWithGetters` function for further processing.
 *
 * @param {object} moduleObject - The module or object to be wrapped as an ES module.
 * @returns {any} The result of processing the ES module-wrapped object with copyPropertiesWithGetters.
 */
const wrapAsEsModuleAndProcess = (moduleObject) => {
  // Create a shallow copy of the input object and add the __esModule property
  const esModuleObject = MB1({}, "__esModule", { value: true });
  // Pass the ES module object and the original module/object to copyPropertiesWithGetters for processing
  return copyPropertiesWithGetters(esModuleObject, moduleObject);
};

module.exports = wrapAsEsModuleAndProcess;
