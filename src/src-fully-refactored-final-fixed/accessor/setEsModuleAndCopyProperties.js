/**
 * Sets the __esModule property to true on a new object and copies all own properties
 * from the provided source object to this new object, except for the '__esModule' key
 * and any keys already present on the target. This is typically used to mark an object
 * as an ES module and copy its properties in a safe way.
 *
 * @param {Object} sourceObject - The object whose properties will be copied to the new object.
 * @returns {Object} a new object with __esModule set to true and all eligible properties copied from sourceObject.
 */
const setEsModuleAndCopyProperties = (sourceObject) => {
  // Create a new object with __esModule set to true
  const esModuleObject = gQ1({}, "__esModule", { value: true });

  // Copy all own properties from sourceObject to esModuleObject,
  // except for '__esModule' and any keys already present on esModuleObject
  return copyMissingProperties(esModuleObject, sourceObject);
};

module.exports = setEsModuleAndCopyProperties;