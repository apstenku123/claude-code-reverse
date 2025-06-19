/**
 * Marks the provided object as an ES module and copies its properties as getters onto a new object.
 *
 * This function creates a new object with the `__esModule` property set to true, then copies all own properties
 * from the provided source object onto this new object as getters, preserving enumerability and excluding properties
 * that already exist on the target.
 *
 * @param {Object} sourceObject - The object whose properties will be copied as getters onto the ES module wrapper.
 * @returns {Object} a new object marked as an ES module with all properties from the source object as getters.
 */
const exportAsEsModuleWithGetters = (sourceObject) => {
  // Create a new object with __esModule: true
  const esModuleWrapper = fQ1({}, "__esModule", { value: true });
  // Copy all own properties from sourceObject as getters onto esModuleWrapper
  return copyMissingPropertiesWithGetters(esModuleWrapper, sourceObject);
};

module.exports = exportAsEsModuleWithGetters;