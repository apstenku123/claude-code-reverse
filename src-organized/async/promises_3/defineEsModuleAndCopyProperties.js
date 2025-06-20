/**
 * Adds the __esModule property to the target object and copies all properties from the source object.
 *
 * This function creates a new object with the __esModule property set to true, then copies all properties
 * from the provided source object onto this new object using defineMissingPropertiesFromSource (copyMissingPropertiesWithGetters).
 *
 * @param {Object} sourceObject - The object whose properties will be copied onto the target object.
 * @returns {Object} a new object with __esModule set to true and all properties from the source object.
 */
const defineEsModuleAndCopyProperties = (sourceObject) => {
  // Create a new object with __esModule property set to true
  const esModuleTarget = T81({}, "__esModule", { value: true });

  // Copy all properties from sourceObject onto esModuleTarget
  return defineMissingPropertiesFromSource(esModuleTarget, sourceObject);
};

module.exports = defineEsModuleAndCopyProperties;
