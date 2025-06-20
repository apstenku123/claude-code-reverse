/**
 * Creates a new object that is marked as an ES module and copies all own properties from the provided source object.
 *
 * This function creates a new object with the `__esModule` property set to `true`, then copies all own properties
 * from the `sourceObject` to this new object using getters. Existing properties or excluded keys are not overwritten.
 *
 * @param {Object} sourceObject - The object whose properties will be copied to the ES module wrapper.
 * @returns {Object} a new object with `__esModule: true` and all own properties from the source object.
 */
const createESModuleWithProperties = (sourceObject) => {
  // Create a new object with __esModule property set to true
  const esModuleWrapper = FX1({}, "__esModule", { value: true });

  // Copy all own properties from sourceObject to esModuleWrapper as getters
  return copyMissingPropertiesWithGetters(esModuleWrapper, sourceObject);
};

module.exports = createESModuleWithProperties;
