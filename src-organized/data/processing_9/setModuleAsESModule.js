/**
 * Marks the provided module object as an ES module by adding the __esModule property,
 * then processes isBlobOrFileLikeObject using the copyPropertiesWithGetters function and returns the result.
 *
 * @param {object} moduleObject - The module object to be marked as an ES module and processed.
 * @returns {object} The processed module object with the __esModule property set to true.
 */
const setModuleAsESModule = (moduleObject) => {
  // Create a new object with the __esModule property set to true
  const esModuleObject = MX1({}, "__esModule", { value: true });

  // Process the module object using copyPropertiesWithGetters and return the result
  return copyPropertiesWithGetters(esModuleObject, moduleObject);
};

module.exports = setModuleAsESModule;