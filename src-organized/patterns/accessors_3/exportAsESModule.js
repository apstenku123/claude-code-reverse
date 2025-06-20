/**
 * Marks the provided module object as an ES module and copies its properties to a new object.
 *
 * This function creates a new object with the `__esModule` property set to `true`,
 * then copies all enumerable properties from the provided module object to this new object
 * using property getters, preserving property enumerability and avoiding overwriting existing properties.
 *
 * @param {object} moduleObject - The module object whose properties should be exported as an ES module.
 * @returns {object} a new object marked as an ES module with all properties from the original module.
 */
const exportAsESModule = (moduleObject) => {
  // Create a new object with __esModule: true
  const esModuleObject = MB1({}, "__esModule", {
    value: true
  });
  // Copy all properties from the original module object to the new ES module object
  // using property getters, preserving enumerability and avoiding overwriting existing properties
  return copyPropertiesWithGetters(esModuleObject, moduleObject);
};

module.exports = exportAsESModule;
