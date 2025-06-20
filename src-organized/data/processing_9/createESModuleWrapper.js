/**
 * Wraps the provided module object with an ES module flag and processes isBlobOrFileLikeObject with copyMissingPropertiesWithGetters.
 *
 * @param {object} moduleObject - The module object to be wrapped and processed.
 * @returns {any} The result of processing the ES module-wrapped object with copyMissingPropertiesWithGetters.
 */
const createESModuleWrapper = (moduleObject) => {
  // Add the __esModule property to indicate ES module compatibility
  const esModuleObject = cB1({}, "__esModule", { value: true });
  // Merge the original module object with the ES module flag
  const wrappedModule = cB1(esModuleObject, moduleObject);
  // Process the wrapped module with copyMissingPropertiesWithGetters and return the result
  return copyMissingPropertiesWithGetters(wrappedModule);
};

module.exports = createESModuleWrapper;
