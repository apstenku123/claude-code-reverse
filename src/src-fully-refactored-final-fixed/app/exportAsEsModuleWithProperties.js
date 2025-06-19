/**
 * Adds the __esModule flag to the provided object and copies its properties to a new object as ES module exports.
 *
 * @param {Object} sourceObject - The object whose properties should be exported as ES module properties.
 * @returns {Object} a new object with __esModule set to true and all properties from the source object copied as getters.
 */
const exportAsEsModuleWithProperties = (sourceObject) => {
  // Create a new object with the __esModule property set to true
  const esModuleObject = TQ1({}, "__esModule", { value: true });

  // Copy all own properties from the source object to the esModuleObject as getters
  // (excluding properties that already exist on the target)
  return copyMissingPropertiesWithGetters(esModuleObject, sourceObject);
};

module.exports = exportAsEsModuleWithProperties;
