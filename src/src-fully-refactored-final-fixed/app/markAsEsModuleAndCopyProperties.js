/**
 * Marks the provided object as an ES module and copies its properties (with getters) onto a new object.
 *
 * This function creates a new object with the `__esModule` property set to `true`,
 * then copies all own properties from the provided source object onto this new object
 * using getter properties, excluding the `__esModule` key and any keys already present on the target.
 *
 * @param {object} sourceObject - The object whose properties will be copied to the new ES module-marked object.
 * @returns {object} a new object marked as an ES module with all properties from the source object copied as getters.
 */
const markAsEsModuleAndCopyProperties = (sourceObject) => {
  // Create a new object with __esModule: true
  const esModuleObject = noA({}, "__esModule", { value: true });
  // Copy all own properties from sourceObject to esModuleObject as getters, excluding __esModule and existing keys
  return copyPropertiesWithGetters(esModuleObject, sourceObject);
};

module.exports = markAsEsModuleAndCopyProperties;
