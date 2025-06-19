/**
 * Wraps the provided module/object as an ES module by adding the __esModule property.
 *
 * @param {any} moduleObject - The module or object to be wrapped as an ES module.
 * @returns {any} The result of calling copyMissingPropertiesWithGetters with the ES module-wrapped object and the original moduleObject.
 */
const wrapAsEsModule = (moduleObject) => {
  // Create a new object with __esModule: true and copy properties from moduleObject
  const esModuleObject = NB1({}, "__esModule", { value: true });
  // Pass the ES module object and the original moduleObject to copyMissingPropertiesWithGetters
  return copyMissingPropertiesWithGetters(esModuleObject, moduleObject);
};

module.exports = wrapAsEsModule;
