/**
 * Adds the __esModule property to the target object and copies all properties from the source object as getters.
 *
 * @function exportModuleWithProperties
 * @param {object} sourceModule - The module object whose properties should be exported.
 * @returns {object} a new object with __esModule set to true and all properties from the source module copied as getters.
 */
const exportModuleWithProperties = (sourceModule) => {
  // Create a new object with __esModule set to true
  const targetModule = sQ1({}, "__esModule", {
    value: true
  });

  // Copy all properties from sourceModule to targetModule as getters
  return copyMissingPropertiesWithGetters(targetModule, sourceModule);
};

module.exports = exportModuleWithProperties;
