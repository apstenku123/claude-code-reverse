/**
 * Sets the __esModule property on a new object and copies all own properties from the source object
 * as getters, excluding any properties already present on the target and the specified property.
 * This is typically used to create a CommonJS-compatible module export object from an ES module.
 *
 * @param {object} sourceModule - The source module object whose properties will be copied as getters.
 * @returns {object} The new module export object with __esModule set to true and all properties from the source module.
 */
const setModuleExportsWithGetters = (sourceModule) => {
  // Create a new object with the __esModule property set to true
  const moduleExport = kJ1({}, "__esModule", { value: true });

  // Copy all own properties from the source module to the export object as getters,
  // excluding any properties already present on the target and the specified property
  return copyMissingPropertiesWithGetters(moduleExport, sourceModule);
};

module.exports = setModuleExportsWithGetters;
