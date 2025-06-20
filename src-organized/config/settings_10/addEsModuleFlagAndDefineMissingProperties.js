/**
 * Adds the __esModule flag to the provided module object and defines any missing properties from the source object.
 *
 * @param {Object} sourceModule - The module object to which the __esModule flag and missing properties will be added.
 * @returns {Object} The resulting module object with the __esModule flag and all missing properties defined.
 */
const addEsModuleFlagAndDefineMissingProperties = (sourceModule) => {
  // Create a config object with the __esModule property set to true
  const esModuleConfig = oJ1({}, "__esModule", { value: true });

  // Use defineMissingProperties (copyMissingPropertiesWithGetters) to add missing properties from sourceModule to esModuleConfig
  return copyMissingPropertiesWithGetters(esModuleConfig, sourceModule);
};

module.exports = addEsModuleFlagAndDefineMissingProperties;
