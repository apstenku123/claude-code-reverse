/**
 * Adds the __esModule flag to the provided module object and copies all own properties from the source module
 * as getters onto the target, preserving enumerability and avoiding overwriting existing properties.
 *
 * @param {object} sourceModule - The module object whose properties should be copied as getters.
 * @returns {object} The new module object with __esModule set to true and all properties from the source module attached as getters.
 */
const exportAsESModuleWithGetters = (sourceModule) => {
  // Create a new object with __esModule: true
  const esModuleFlaggedObject = w31({}, "__esModule", {
    value: true
  });

  // Copy all own properties from sourceModule as getters onto esModuleFlaggedObject
  // (excluding properties already present or the excluded key)
  return copyMissingPropertiesWithGetters(esModuleFlaggedObject, sourceModule);
};

module.exports = exportAsESModuleWithGetters;
