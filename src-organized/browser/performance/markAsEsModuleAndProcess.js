/**
 * Marks the provided module as an ES module and processes isBlobOrFileLikeObject using copyMissingPropertiesWithGetters.
 *
 * @param {any} moduleObject - The module object to be marked and processed.
 * @returns {any} The result of processing the marked module object with copyMissingPropertiesWithGetters.
 */
const markAsEsModuleAndProcess = (moduleObject) => {
  // Create a new object based on moduleObject, adding the __esModule property set to true
  const esModuleObject = yX1({}, "__esModule", { value: true });
  // Process the marked module object with copyMissingPropertiesWithGetters
  return copyMissingPropertiesWithGetters(esModuleObject, moduleObject);
};

module.exports = markAsEsModuleAndProcess;
