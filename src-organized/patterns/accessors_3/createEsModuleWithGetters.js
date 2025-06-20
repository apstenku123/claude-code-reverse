/**
 * Adds the __esModule property to the provided module object and copies all own properties from the source module
 * to the target object as getter properties, preserving enumerability and avoiding overwriting existing keys.
 *
 * @param {object} sourceModule - The module object whose properties will be copied as getters.
 * @returns {object} a new object with __esModule set to true and all properties from sourceModule copied as getters.
 */
const createESModuleWithGetters = (sourceModule) => {
  // Create a new object with __esModule: true
  const esModuleObject = AX1({}, "__esModule", {
    value: true
  });
  // Copy all own properties from sourceModule to esModuleObject as getters
  return copyMissingPropertiesWithGetters(esModuleObject, sourceModule);
};

module.exports = createESModuleWithGetters;