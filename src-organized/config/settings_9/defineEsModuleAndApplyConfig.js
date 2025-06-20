/**
 * Adds the __esModule property to the target object and applies missing properties from the config object.
 *
 * This function creates a new object with the __esModule property set to true, then uses
 * defineMissingPropertiesFromConfig (defineMissingPropertiesFromConfig) to define any missing properties from the provided source object.
 *
 * @param {Object} sourceObject - The object to which missing properties from the config will be applied.
 * @returns {Object} The resulting object with __esModule set to true and missing properties defined.
 */
const defineEsModuleAndApplyConfig = (sourceObject) => {
  // Create a new object with __esModule property set to true
  const esModuleObject = eJ1({}, "__esModule", { value: true });

  // Apply missing properties from the sourceObject using defineMissingPropertiesFromConfig
  // (defineMissingPropertiesFromConfig defines missing properties as getters, preserving enumerability)
  return defineMissingPropertiesFromConfig(esModuleObject, sourceObject);
};

module.exports = defineEsModuleAndApplyConfig;
