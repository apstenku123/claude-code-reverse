/**
 * Sets the __esModule flag on a new object and copies all own properties from the source object
 * as getters, except for properties that already exist on the target. This is typically used to
 * ensure that the resulting object is recognized as an ES module and has all the properties of the source.
 *
 * @param {Object} sourceObject - The object whose properties will be copied to the new ES module object.
 * @returns {Object} a new object with __esModule set to true and all properties from the source object copied as getters.
 */
function setEsModuleFlagAndCopyProperties(sourceObject) {
  // Create a new object with the __esModule property set to true
  const esModuleObject = V31({}, "__esModule", { value: true });

  // Copy all own properties from the source object to the new ES module object as getters
  // Properties that already exist on the target or match excluded keys are not copied
  return copyMissingPropertiesWithGetters(esModuleObject, sourceObject);
}

module.exports = setEsModuleFlagAndCopyProperties;